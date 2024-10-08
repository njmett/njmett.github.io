---
sidebar_position: 9
---

# Credential Access

Here are some examples to look for malicious activity for Credential Access. Elastic stack is used for hunting and the example queries are in KQL language but the principle remains the same if there is another system in use.

## LSASS Credential Dumping

### Mimikatz Execution

Potential usage of Mimikatz for credential dumping:

```
winlog.event_id: 1 AND process.command_line: (*mimikatz* OR *DumpCreds* OR *privilege\:\:debug* OR *sekurlsa\:\:*)
```

Useful fields to look at for example:
- host.name
- user.name
- process.parent.command_line
- process.name
- process.command_line

### LSASS Process Dumping

File creations of lsass.DMP:

```
winlog.event_id: 11 AND file.path: *lsass.DMP
```

Useful fields to look at for example:
- host.name
- winlog.event_data.User
- process.name
- file.path


## Credential Harvesting via DCSync

DCSync abuses how domain controllers in an Active Directory network communicate and replicate data. Normally, domain controllers synchronise directory information, including password hashes, via the Directory Replication Service Remote protocol (MS-DRSR). The replication request to a domain controller requires the following privileges:

- DS-Replication-Get-Changes (1131f6aa-9c07-11d1-f79f-00c04fc2dcd2)
- DS-Replication-Get-Changes-All (1131f6ad-9c07-11d1-f79f-00c04fc2dcd2)
- Replicating Directory Changes All (9923a32a-3607-11d2-b9be-0000f87a36b2)
- Replicating Directory Changes In Filtered Set (89e95b76-444d-4c62-991a-0facbeda640c)

Note: Only Domain/Enterprise Admins and domain controller machine accounts have these privileges by default.

Unusual replication attempts to the domain controller:

```
winlog.event_id: 4662 AND winlog.event_data.AccessMask: 0x100 AND winlog.event_data.Properties: (*1131f6aa-9c07-11d1-f79f-00c04fc2dcd2* OR *1131f6ad-9c07-11d1-f79f-00c04fc2dcd2* OR *9923a32a-3607-11d2-b9be-0000f87a36b2* OR *89e95b76-444d-4c62-991a-0facbeda640c*)
```

For this query, we will use the event ID 4662 to hunt for events related to Directory Service object access to trace when a user attempts to access an Active Directory Domain Services (AD DS) object.

Useful fields to look at for example:
- host.name
- winlog.event_data.SubjectUserName
- winlog.event_data.AccessMask
- winlog.event_data.Properties

## Brute-Forcing Accounts

Visualize:

All failed logon attempts (Event ID 4625) in a Windows machine:
```
winlog.event_id: 4625
```

All failed login attempts of an account:
```
winlog.event_id: 4625 AND user.name: <user>
```

Useful fields to look at for example:
- host.name
- user.name
- source.ip
- winlog.event_data.LogonType

To confirm if the user has successfully authenticated after a potential brute-forcing attempt:

```
winlog.event_id: 4624 AND user.name: <user> and source.ip: <SourceIP>
```

Processes spawned by the user on host:

```
host.name: <host> AND winlog.event_id: 1 AND user.name: <user>
```

Useful fields to look at for example:
- process.parent.command_line
- process.command_line