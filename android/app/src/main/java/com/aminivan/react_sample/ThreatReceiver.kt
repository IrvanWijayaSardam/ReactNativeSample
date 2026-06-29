package com.aminivan.react_sample

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log

class ThreatReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        Log.e("THREAT_TEST", "Broadcast received")

        val threatCode = intent.getStringExtra("threat_code") ?: "UNKNOWN"
        Log.e("THREAT_TEST", "Threat Code = $threatCode")

        val timestamp = intent.getLongExtra("timestamp", 0L).toString()

        val launchIntent = Intent(context, MainActivity::class.java)
        launchIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
        launchIntent.putExtra("threat_code", threatCode)
        launchIntent.putExtra("timestamp", timestamp)

        context.startActivity(launchIntent)
    }
}