package com.mitti.app

import android.os.Build
import android.os.Bundle
import com.getcapacitor.BridgeActivity

/**
 * MainActivity for MITTI Smart Agriculture Application.
 * Configured for Android 14+ (API Level 34 - Upside Down Cake / API 35).
 */
class MainActivity : BridgeActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Android 14+ (API 34 - Upside Down Cake) specific initializations if needed
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
            // Enable edge-to-edge layout & optimizations for API 34+
        }
    }
}
