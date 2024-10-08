---
sidebar_position: 6
---

# Command and Control

Here are some examples to look for malicious activity for command and control. Elastic stack is used for hunting and the example queries are in KQL language but the principle remains the same if there is another system in use.

## Command and Control over DNS

In weblogs:

Visalization with:

```
network.protocol: dns AND NOT dns.question.name: *arpa
```

Query focused on unusual domain and the potentially compromised host:

```
network.protocol: dns AND NOT dns.question.name: *arpa AND dns.question.registered_domain: <domain.com> AND host.name: <host>
```

Useful fields to look at for example:
- query

In hostlogs:

Identify the process executing the DNS requests:

```
host.name: <host> AND destination.ip: <IP> AND destination.port: <port>
```

Useful fields to look at for example:
- host.name
- user.name
- process.parent.command_line
- process.name
- process.command_line

## Command and Control over Cloud Apps

Identify an app that workstations do not commonly access. Example case discord:

```
host.name: <host> AND *discord.gg*
```

Useful fields to look at for example:
- host.name
- process.executable
- dns.question.name

If connections going to Discord are initiated by C:\Windows\Temp\installer.exe. We can investigate further by hunting all processes spawned by this process:

```
host.name: <host> AND winlog.event_id: 1 AND process.parent.executable: "C:\\Windows\\Temp\\installer.exe"
```

## Command and Control over Encrypted HTTP Traffic

Network packet log visualization:

List all outbound HTTP requests:

```
network.protocol: http AND network.direction: egress
```

It may be a sign of C2 connection if numerous connections to a domain.

Modify the visalization table and focus the query to `<domain>`:

```
host.name: <host> AND network.protocol: http AND network.direction: egress AND destination.domain: <domain>
```

Hostlogs:

Query for insights regarding the associated process:

```
host.name: <host> AND *<domain>*
```