# Burpsuite

Burp Suite is an integrated platform for performing security testing of web applications. It includes various tools for scanning, fuzzing, intercepting, and analysing web traffic. It is used by security professionals worldwide to find and exploit vulnerabilities in web applications.

## Repeater

Burp Suite Repeater enables us to modify and resend intercepted requests to a target of our choosing.

Send request to Repeater with `Ctrl + R`

## Intruder

Intruder is a fuzzing tool that allows for automated request modification and repetitive testing with variations in input values. Intruder's functionality is comparable to tools like Wfuzz or ffuf.

Send request to Intruder with `Ctrl + I`

First step is to set the positions within the request where we want to insert our payload. Selected positions are surrounded with `§` markers

Second payload options are set.

Attack types:

1. Sniper:  cycles through the payloads, inserting one payload at a time into each position defined in the request. Sniper attacks iterate through all the payloads in a linear fashion, allowing for precise and focused testing.

2. Battering ram:  differs from Sniper in that it sends all payloads simultaneously, each payload inserted into its respective position. This attack type is useful when testing for race conditions or when payloads need to be sent concurrently.

3. Pitchfork: enables the simultaneous testing of multiple positions with different payloads. It allows the tester to define multiple payload sets, each associated with a specific position in the request. Pitchfork attacks are effective when there are distinct parameters that need separate testing.

4. Cluster bomb: Combines the Sniper and Pitchfork approaches. It performs a Sniper-like attack on each position but simultaneously tests all payloads from each set. This attack type is useful when multiple positions have different payloads, and we want to test them all together.