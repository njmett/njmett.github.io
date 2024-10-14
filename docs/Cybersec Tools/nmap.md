# Nmap

Nmap (Network Mapper) is a open-source tool used for network discovery and security auditing. It also assists in the exploration of network hosts and services, providing information about open ports, operating systems, and other details.

## Port Scanning

| Port Scan Type | Example Command |
| - | - |
| TCP Connect Scan | nmap -sT IP |
| TCP SYN Scan | sudo nmap -sS IP |
| UDP Scan | sudo nmap -sU P |


| Port Scan Type | Example Command |
| - | - |
| TCP Null Scan | sudo nmap -sN IP |
| TCP FIN Scan | sudo nmap -sF IP |
| TCP Xmas Scan | sudo nmap -sX IP |
| TCP Maimon Scan | sudo nmap -sM IP |
| TCP ACK Scan | sudo nmap -sA IP |
| TCP Window Scan | sudo nmap -sW IP |
|Custom TCP Scan | sudo nmap --scanflags URGACKPSHRSTSYNFIN IP |
| Spoofed Source IP | sudo nmap -S SPOOFED_IP IP |
| Spoofed MAC Address | --spoof-mac SPOOFED_MAC |
| Decoy Scan | nmap -D DECOY_IP,ME IP |
| Idle (Zombie) Scan | sudo nmap -sI ZOMBIE_IP IP |
| Fragment IP data into 8 bytes | -f |
| Fragment IP data into 16 bytes | -ff |

### Flags

| Option | Purpose |
| - | - |
| -p- | all ports |
| -p1-1023 | scan ports 1 to 1023 |
| -F | 100 most common ports |
| -r | scan ports in consecutive order |
| -T\<0-5> | -T0 being the slowest and T5 the fastest |
| --max-rate 50 | rate \<= 50 packets/sec |
| --min-rate 15 | rate >= 15 packets/sec |
| --min-parallelism 100 | at least 100 probes in parallel |
| --reason | explains how Nmap made its conclusion |
| -v | verbose |
| -vv | very verbose |
| -d | debugging |
| -dd |	more details for debugging |

## Post port scans

| Option | Meaning |
| - | - |
| -sV | determine service/version info on open ports |
| -sV --version-light | try the most likely probes (2) |
| -sV --version-all | try all available probes (9) |
| -O | detect OS |
| --traceroute | run traceroute to target |
| --script=SCRIPTS | Nmap scripts to run |
| -sC or --script=default | run default scripts |
| -A | equivalent to -sV -O -sC --traceroute |
| -oN | save output in normal format |
| -oG | save output in grepable format |
| -oX | save output in XML format |
| -oA | save output in normal, XML and Grepable formats |

## Host Discovery

### ARP scanning

Discover online hosts without port-scanning the live systems, you can issue `nmap -sn TARGETS`. `-PR` indicates that you only want an ARP scan.

Example:

`nmap -PR -sn IP/Subnet`

### ICMP scanning

Checks if the target responds to ping. 

Example:

`nmap -PE -sn IP/Subnet`

### TCP/UDP

TCP Syn:

`nmap -PS -sn IP/Subnet`

TCP Ack:

`nmap -PA -sn IP/Subnet`

UDP ping:

`nmap -PU -sn IP/Subnet`