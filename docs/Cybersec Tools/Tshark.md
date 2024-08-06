# TShark

What this is? TODO

## Linux cmd-line hints

| Tool/Utility | Purpose and Benefit |
| - | - |
|capinfos | A program that provides details of a specified capture file. It is suggested to view the summary of the capture file before starting an investigation. |
| grep | Helps search plain-text data. |
| cut | Helps cut parts of lines from a specified data source. |
| uniq | Filters repeated lines/values. |
| nl | Views the number of shown lines. |
| sed | A stream editor. |
| awk | Scripting language that helps pattern search and processing. |

## Basics

| Parameter | Purpose |
| - | - |
| -h | Display the help page with the most common features. |
| -v |  Show version info. |
| -D | List available sniffing interfaces. |
| -i | Choose an interface to capture live traffic. |
| No Parameter | Sniff the traffic like tcpdump. |
| -r | Read/input function. Read a capture file. `tshark -r demo.pcapng` |
| -c | Packet count. Stop after capturing a specified number of packets. `tshark -c 10` |
| -w | Write/output function. Write the sniffed traffic to a file. `tshark -w sample-capture.pcap` |
| -V | Provide detailed information for each packet. This option will provide details similar to Wireshark's "Packet Details Pane". |
| -q | Suspress the packet outputs on the terminal. |
| -x | Display packet bytes. Show packet details in hex and ASCII dump for each packet. |

## Capture Condition Parameters

Define capture conditions for a single run/loop. STOP after completing the condition. Also known as "Autostop".

`-a	`

Duration: Sniff the traffic and stop after X seconds. Create a new file and write output to it.

`tshark -w test.pcap -a duration:1`

Filesize: Define the maximum capture file size. Stop after reaching X file size (KB).

`tshark -w test.pcap -a filesize:10`

Files: Define the maximum number of output files. Stop after X files.

`tshark -w test.pcap -a filesize:10 -a files:3`

Ring buffer control options. Define capture conditions for multiple runs/loops. (INFINITE LOOP). 

`-b	`

Duration: Sniff the traffic for X seconds, create a new file and write output to it. 

`tshark -w test.pcap -b duration:1`

Filesize: Define the maximum capture file size. Create a new file and write output to it after reaching filesize X (KB).

`tshark -w test.pcap -b filesize:10`

Files: Define the maximum number of output files. Rewrite the first/oldest file after creating X files.

`tshark -w test.pcap -b filesize:10 -b files:3`

## Capture filters 

**Type**

Target match type. You can filter IP addresses, hostnames, IP ranges, and port numbers. Note that if you don't set a qualifier, the "host" qualifier will be used by default.

host | net | port | portrange

Filtering a host

`tshark -f "host 10.10.10.10"`

Filtering a network range 

`tshark -f "net 10.10.10.0/24"`

Filtering a Port

`tshark -f "port 80"`

Filtering a port range

`tshark -f "portrange 80-100"`

**Direction**	

Target direction/flow. Note that if you don't use the direction operator, it will be equal to "either" and cover both directions.

src | dst

Filtering source address

`tshark -f "src host 10.10.10.10"`

Filtering destination address

`tshark -f "dst host 10.10.10.10"`

**Protocol**

Target protocol.

arp | ether | icmp | ip | ip6 | tcp | udp

Filtering TCP

`tshark -f "tcp"`

Filtering MAC address

`tshark -f "ether host F8:DB:C5:A2:5D:81"`

You can also filter protocols with IP Protocol numbers assigned by IANA.

Filtering IP Protocols 1 (ICMP)

`tshark -f "ip proto 1"`

[Assigned Internet Protocol Numbers](https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml)

## Display filters

**Protocol: IP**

Filtering an IP without specifying a direction.

`tshark -Y 'ip.addr == 10.10.10.10'`

Filtering a network range 

`tshark -Y 'ip.addr == 10.10.10.0/24'`

Filtering a source IP

`tshark -Y 'ip.src == 10.10.10.10'`

Filtering a destination IP

`tshark -Y 'ip.dst == 10.10.10.10'`

**Protocol: TCP**

Filtering TCP port

`tshark -Y 'tcp.port == 80'`

Filtering source TCP port

`tshark -Y 'tcp.srcport == 80'`

**Protocol: HTTP**

Filtering HTTP packets

`tshark -Y 'http'`

Filtering HTTP packets with response code "200"

`tshark -Y "http.response.code == 200"`

**Protocol: DNS**

Filtering DNS packets

`tshark -Y 'dns'`

Filtering all DNS "A" packets

`tshark -Y 'dns.qry.type == 1'`

## Statistics

| Parameter | Purpose |
| - | - |
| --color | Wireshark-like colourised output. |
| -z | Statistics. There are multiple options available under this parameter. View the available filters: `tshark -z help` Each time you filter the statistics, packets are shown first, then the statistics provided. You can suppress packets and focus on the statistics by using the -q parameter. |

### Examples

Protocol Hierarchy
- `tshark -r demo.pcapng -z io,phs -q`

Packet Lengths Tree
- `tshark -r demo.pcapng -z plen,tree -q`

Endpoints
- `tshark -r demo.pcapng -z endpoints,ip -q`

Conversations
- `tshark -r demo.pcapng -z conv,ip -q`

Expert Info
- `tshark -r demo.pcapng -z expert -q`

IPv4 and IPv6

Sample IPv4 protocol types
- `tshark -r demo.pcapng -z ptype,tree -q`

Available hosts
- `tshark -r demo.pcapng -z ip_hosts,tree -q`
- `tshark -r demo.pcapng -z ipv6hosts,tree -q`

Source and destination addresses
- `tshark -r demo.pcapng -z ip_srcdst,tree -q`

Destinations and ports
- `tshark -r demo.pcapng -z dests,tree -q`

DNS statistics
- `tshark -r demo.pcapng -z dns,tree -q`

HTTP packet statistics
- `tshark -r demo.pcapng -z http,tree -q`

## Follow Stream

This option helps analysts to follow traffic streams similar to Wireshark.

`-z follow,<protocol>,<view mode>,<stream number>,<possible parameter>`

- TCP Streams: `-z follow,tcp,ascii,0 -q`
- UDP Streams: `-z follow,udp,ascii,0 -q`
- HTTP Streams: `-z follow,http,ascii,0 -q`

## Export Objects

This option helps analysts to extract files from DICOM, HTTP, IMF, SMB and TFTP.

`tshark -r demo.pcapng --export-objects http,/home/ubuntu/Desktop/extracted-by-tshark -q`

## Credentials

This option helps analysts to detect and collect cleartext credentials from FTP, HTTP, IMAP, POP and SMTP.

`tshark -r credentials.pcap -z credentials -q`

## Filtering options

### Contains, Matches and Extract Fields
Extract fields

`tshark -r demo.pcapng -T fields -e ip.src -e ip.dst -E header=y -c 5`

Filter: "contains"

Example = Find all "Apache" servers.

`tshark -r demo.pcapng -Y 'http.server contains "Apache"'`

Filter: "matches"

Example = Find all .php and .html pages.

`tshark -r demo.pcapng -Y 'http.request.method matches "(GET|POST)"'`

## Extract 

Hostnames

`tshark -r hostnames.pcapng -T fields -e dhcp.option.hostname | awk NF | sort -r | uniq -c | sort -r`

DNS Queries

`tshark -r dns-queries.pcap -T fields -e dns.qry.name | awk NF | sort -r | uniq -c | sort -r`

User Agents

`tshark -r user-agents.pcap -T fields -e http.user_agent | awk NF | sort -r | uniq -c | sort -r`