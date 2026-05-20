/* ============================================================
   ct-bridge.js
   CleverTap universal JS bridge + iOS Swift / Android Kotlin
   code generators. No template data here — only helpers.
   ============================================================ */

const CT_BRIDGE = `
<script>
// ── CleverTap Universal Bridge ──
// Detects platform and routes events correctly
window.CT = {
  isAndroid: !!window.CleverTap,
  isIOS: !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.clevertap),

  pushEvent: function(name, props) {
    if (this.isAndroid) {
      if (props) {
        window.CleverTap.pushEvent(name, JSON.stringify(props));
      } else {
        window.CleverTap.pushEvent(name);
      }
    } else if (this.isIOS) {
      window.webkit.messageHandlers.clevertap.postMessage({
        action: 'pushEvent', eventName: name, eventProps: props || {}
      });
    }
    console.log('[CT] pushEvent:', name, props);
  },

  pushProfile: function(props) {
    var p = JSON.stringify(props);
    if (this.isAndroid) window.CleverTap.pushProfile(p);
    else if (this.isIOS) window.webkit.messageHandlers.clevertap.postMessage({action:'pushProfile', profileProps: props});
    console.log('[CT] pushProfile:', props);
  },

  dismiss: function() {
    if (this.isAndroid) window.CleverTap.dismissInAppNotification();
    else if (this.isIOS) window.webkit.messageHandlers.clevertap.postMessage({action:'dismiss'});
    else document.querySelector('.inapp-root')&&(document.querySelector('.inapp-root').style.animation='fadeOut .3s ease forwards');
    console.log('[CT] dismiss');
  },

  openURL: function(url) {
    if (this.isAndroid) {
      window.CleverTap.triggerInAppAction(JSON.stringify({type:'open-url',url:url}), 'CTA', 'btn1');
    } else if (this.isIOS) {
      window.webkit.messageHandlers.clevertap.postMessage({action:'openURL', url: url});
    } else {
      window.open(url, '_blank');
    }
    console.log('[CT] openURL:', url);
  }
};
@READYSCRIPT@
<\/script>`;

/* ===================================================================
   iOS SWIFT CODE (same for all templates, only event names differ)
   =================================================================== */
function iosCode(tpl) {
return `// ── iOS (Swift) — CleverTap InApp Event Tracking ──
// Minimum SDK: CleverTap iOS SDK v6.0+
// Add to your WKWebView delegate or CTInAppNotificationDelegate

import CleverTapSDK
import WebKit

// 1. Conform to InAppNotificationDelegate
class YourViewController: UIViewController, CleverTapInAppNotificationDelegate {

    override func viewDidLoad() {
        super.viewDidLoad()
        CleverTap.sharedInstance()?.setInAppNotificationDelegate(self)
    }

    // 2. Callback — fires when any InApp button or link is tapped
    func inAppNotificationDismissed(
        withExtras extras: [AnyHashable: Any],
        andButtonExtras buttonExtras: [AnyHashable: Any]?
    ) {
        print("[CT iOS] InApp dismissed, extras:", extras)
        if let cta = buttonExtras?["wzrk_c2a"] as? String {
            handleCTA(cta)
        }
    }

    func inAppNotificationButtonTapped(
        withCustomExtras customExtras: [AnyHashable: Any]?
    ) {
        print("[CT iOS] Button tapped:", customExtras ?? [:])
    }
}

// 3. Handle webkit.messageHandlers.clevertap.postMessage from HTML
// Register WKScriptMessageHandler named "clevertap"
extension YourViewController: WKScriptMessageHandler {
    func userContentController(
        _ controller: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard message.name == "clevertap",
              let body = message.body as? [String: Any],
              let action = body["action"] as? String else { return }

        switch action {
        case "pushEvent":
            let name = body["eventName"] as? String ?? ""
            let props = body["eventProps"] as? [String: Any] ?? [:]
            CleverTap.sharedInstance()?.recordEvent(name, withProps: props)
            // For "${tpl.title}":
            // CleverTap.sharedInstance()?.recordEvent("${tpl.ctEvent}", withProps: ${JSON.stringify(tpl.ctProps)})

        case "pushProfile":
            let props = body["profileProps"] as? [String: Any] ?? [:]
            CleverTap.sharedInstance()?.profilePush(props)

        case "dismiss":
            CleverTap.sharedInstance()?.recordEvent("InApp Dismissed")
            // dismiss logic handled by SDK automatically

        case "openURL":
            if let urlStr = body["url"] as? String,
               let url = URL(string: urlStr) {
                UIApplication.shared.open(url)
            }

        default:
            break
        }
    }
}

// 4. Trigger this InApp campaign from code (optional)
// CleverTap.sharedInstance()?.recordEvent("${tpl.trigger}", withProps: ["source": "home_screen"])
`;
}

/* ===================================================================
   ANDROID KOTLIN CODE
   =================================================================== */
function androidCode(tpl) {
return `// ── Android (Kotlin) — CleverTap InApp Event Tracking ──
// Minimum SDK: CleverTap Android SDK v5.0+
// Enable JS in dashboard: InApp > Custom HTML > "Enable JavaScript" checkbox

import com.clevertap.android.sdk.CleverTapAPI
import com.clevertap.android.sdk.inapp.CTInAppNotification
import com.clevertap.android.sdk.listeners.InAppNotificationListener

class MainActivity : AppCompatActivity(), InAppNotificationListener {

    private lateinit var cleverTap: CleverTapAPI

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        cleverTap = CleverTapAPI.getDefaultInstance(this)!!
        cleverTap.setInAppNotificationListener(this)
    }

    // ── Fires before InApp is shown (return false to suppress) ──
    override fun beforeShow(extras: Map<String, Any>): Boolean {
        println("[CT Android] beforeShow: \$extras")
        return true // return false to block display
    }

    // ── Fires when InApp is visible ──
    override fun onShow(ctInAppNotification: CTInAppNotification) {
        println("[CT Android] InApp shown: \${ctInAppNotification.campaignId}")
        cleverTap.pushEvent("InApp Viewed", mapOf(
            "template" to "${tpl.title}",
            "campaign_id" to ctInAppNotification.campaignId
        ))
    }

    // ── Fires on dismiss — read CTA from actionExtras ──
    override fun onDismissed(
        extras: Map<String, Any>,
        actionExtras: Map<String, Any>?
    ) {
        val cta = actionExtras?.get("wzrk_c2a") as? String
        println("[CT Android] Dismissed, CTA: \$cta")
        when (cta) {
            "${tpl.ctEvent}" -> {
                // Handle primary CTA
                cleverTap.pushEvent("${tpl.ctEvent}", ${JSON.stringify(tpl.ctProps)}.toCleverTapProps())
            }
            "Dismiss" -> cleverTap.pushEvent("InApp Dismissed")
        }
    }
}

// ── JavaScript Interface — window.CleverTap is auto-provided by SDK ──
// These are available inside your HTML via: if (window.CleverTap) { ... }
//
//   window.CleverTap.pushEvent("${tpl.ctEvent}", JSON.stringify(${JSON.stringify(tpl.ctProps)}))
//   window.CleverTap.pushProfile(JSON.stringify({"Last InApp": "${tpl.title}"}))
//   window.CleverTap.dismissInAppNotification()
//   window.CleverTap.promptPushPermission(true) // For push opt-in templates

// ── Trigger this campaign (raise event that matches campaign trigger) ──
// cleverTap.pushEvent("${tpl.trigger}", mapOf("source" to "home_screen"))

// ── Helper extension ──
fun Map<String, Any>.toCleverTapProps(): String = this.entries.joinToString(",","{"  ,"}"){
    "\\"${"\$"}{it.key}\\": \\"${"\$"}{it.value}\\""
}
`;
}

/* ===================================================================
   TEMPLATES
   =================================================================== */
