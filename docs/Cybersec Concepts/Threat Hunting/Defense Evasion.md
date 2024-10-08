---
sidebar_position: 4
---

# Defense Evasion

Here are some examples to look for malicious activity for defence evasion. Elastic stack is used for hunting and the example queries are in KQL language but the principle remains the same if there is another system in use.

## Disabling Security Software

Known commands used to disable Windows Defender:

```
host.name: <host> AND (*DisableRealtimeMonitoring* OR *RemoveDefinitions*)
```

Strings in this query are tied up with the following commands to blind Windows Defender from detecting malicious activity.

- DisableRealtimeMonitoring - Commonly used with PowerShell's Set-MPPreference to disable its real-time monitoring.
- RemoveDefinitions - Commonly used with built-in MpCmdRun.exe to remove all existing signatures of Windows Defender.

Useful fields to look at for example:
- winlog.computer_name
- user.name
- process.parent.command_line
- process.name
- process.command_line

## Log Deletion Attempts

Detect the deletion of Windows Event Logs is via Event ID 1102:

```
host.name: <host> AND winlog.event_id: 1102
```

Useful fields to look at for example:
- winlog.computer_name
- user.name

When looking at surrounding documnents:
- process.name
- process.command_line

## Execution through Process Injection

Sysmon's Event ID 8 (CreateRemoteThread), which detects when a process creates a thread in another process:

```
host.name: WKSTN-* AND winlog.event_id: 8
```

Useful fields to look at for example:
- winlog.computer_name
- process.executable
- winlog.event_data.SourceUser
- winlog.event_data.TargetImage