---
sidebar_position: 5
---

# Persistence

Here are some examples to look for malicious activity for persistence. Elastic stack is used for hunting and the example queries are in KQL language but the principle remains the same if there is another system in use.

## Scheduled Task Creation

If Windows Advanced Audit Policy is properly configured, Event ID 4698 (Scheduled Task Creation). Else, keywords for hunting commands related to scheduled tasks: schtasks and Register-ScheduledTask (PowerShell)

```
host.name: <host> AND (winlog.event_id: 4698 OR (*schtasks* OR *Register-ScheduledTask*))
```

Useful fields to look at for example:
- winlog.computer_name
- user.name
- process.command_line
- winlog.event_id
- winlog.event_data.TaskName

## Registry Key Modification

We can focus on known registry keys abused by threat actors: (example)

- Software\Microsoft\Windows\CurrentVersion\Explorer\Shell (User Shell Folders)
- Software\Microsoft\Windows\CurrentVersion\Run (RunOnce)

```
host.name: <host> AND winlog.event_id: 13 AND winlog.channel: Microsoft-Windows-Sysmon/Operational AND registry.path: (*CurrentVersion\\Run* OR *CurrentVersion\\Explorer\\User* OR *CurrentVersion\\Explorer\\Shell*)
```

Useful fields to look at for example:
- winlog.computer_name
- user.name
- process.name
- registry.path
- winlog.event_data.Details

An alternative way of hunting unusual registry modifications is through process filtering. Registry modifications using reg.exe or powershell.exe:

```
host.name: <host> AND winlog.event_id: 13 AND winlog.channel: Microsoft-Windows-Sysmon/Operational AND process.name: (reg.exe OR powershell.exe)
```