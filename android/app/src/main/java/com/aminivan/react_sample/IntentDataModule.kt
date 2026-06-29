package com.aminivan.react_sample

import android.app.Activity
import android.content.Intent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class IntentDataModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "IntentData"
    }

    @ReactMethod
    fun getIntentExtras(promise: Promise) {
        val activity: Activity? = reactApplicationContext.currentActivity

        if (activity == null) {
            promise.reject("NO_ACTIVITY", "No current activity")
            return
        }

        val intent: Intent = activity.intent
        val map = Arguments.createMap()

        map.putString("threat_code", intent.getStringExtra("threat_code"))
        map.putString("timestamp", intent.getStringExtra("timestamp"))

        promise.resolve(map)
    }
}