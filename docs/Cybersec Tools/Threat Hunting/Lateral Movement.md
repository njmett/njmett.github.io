---
sidebar_position: 10
---

# Lateral Movement

Here are some examples to look for malicious activity for lateral movement. Elastic stack is used for hunting and the example queries are in KQL language but the principle remains the same if there is another system in use.

## Lateral Movement via WMI

Unusual behaviour related to WMI:

```
winlog.event_id: 1 AND process.parent.name: WmiPrvSE.exe
```

Useful fields to look at for example:
- host.name
- user.name
- process.parent.command_line
- process.command_line

The pattern, `cmd.exe /Q /c * \ 1> \\127.0.0.1\ADMIN$\* 2>&1`, is attributed to Impacket's wmiexec.py, a known tool for lateral movement.

## Authentication via Pass-the-Hash

Potential usage of Pass-the-Hash:

```
winlog.event_id: 4624 AND winlog.event_data.LogonType: 3 AND winlog.event_data.LogonProcessName: *NtLmSsp* AND winlog.event_data.KeyLength: 0
```

Useful fields to look at for example:
- host.name
- user.name

ANONYMOUS LOGON is a known false positive value.