---
sidebar_position: 8
---

# Privilege Escalation

Here are some examples to look for malicious activity for privilege escalation. Elastic stack is used for hunting and the example queries are in KQL language but the principle remains the same if there is another system in use.

## Abusing SeImpersonatePrivilege

Processes spawned by the SYSTEM account accompanied by a parent process executed by a low-privileged account:

```
winlog.event_id: 1 AND user.name: SYSTEM AND NOT winlog.event_data.ParentUser: "NT AUTHORITY\SYSTEM"
```

Excluded events with a value of NT AUTHORITY\SYSTEM on its ParentUser field since these events do not indicate privilege escalation.

Useful fields to look at for example:
- host.name
- user.name
- process.parent.command_line
- process.command_line
- winlog.event_data.ParentUser

## Excessive Service Permission Abuse

Excessive service permissions allowing low-privileged users to modify and restart services running on a privileged account context using Sysmon Event ID: 13 (Registry Value Set):

```
winlog.event_id: 13 AND registry.path: *HKLM\\System\\CurrentControlSet\\Services\\*\\ImagePath*
```

Useful fields to look at for example:
- host.name
- process.name
- registry.path
- winlog.event_data.Details (This handles the data written in the registry.)