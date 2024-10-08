# Basic web hacking

## Walking a web application

Tools to manually review a web application for security issues using only the in-built tools in browser.

1. A good first step is just to explore the site and make note of different sections within it.

2. Inspect the page source

3. Use developer tools. Good tabs to look at are Inspector, Debugger and Network.

## Content Discovery

1. robots.txt - sites not to be discovered by search engines

2. favicon - might reveal sites build tech

3. sitemap.xml - sites to be discovered by search engines

4. http headers - may contain server software or site build info

[**Wappalyzer**](https://www.wappalyzer.com/) is an online tool and browser extension that helps identify what technologies a website uses

### Automated content discovery

Tools for example ffuf, dirb and gobuster. Need a wordlist such as [this](https://github.com/danielmiessler/SecLists)

Examples:

ffuf:

`ffuf -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt -u http://SITE/FUZZ`

dirb:

`dirb http://SITE/ /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

Gobuster:

`gobuster dir --url http://SITE/ -w /usr/share/wordlists/SecLists/Discovery/Web-Content/common.txt`

## Subdomain enumeration

Discover subdomains belonging to a domain, sites like https://crt.sh and https://ui.ctsearch.entrust.com/ui/ctsearchui offer a searchable database of certificates that show current and historical results.

Search engine tools for example search:

`site:*.domain.com -site:www.domain.com`

to only contain results leading to the domain name domain.com but exclude any links to www.domain.com.

Automate the above methods with the help of tools like [Sublist3r](https://github.com/aboul3la/Sublist3r)

### Virtual Hosts

Can be found with for example ffuf with the help of a wordlist for example:

`ffuf -w /usr/share/wordlists/SecLists/Discovery/DNS/namelist.txt -H "Host: FUZZ.domain.com" -u http://site -fs {size}`

## Authentication bypass

### Username Enumeration

Website error messages are great resources for collating this information to build our list of valid usernames.

For example: If you try entering the username admin and fill in the other form fields with fake information, you can see an error An account with this username already exists.

Can be tried using ffuf:

`ffuf -w /usr/share/wordlists/SecLists/Usernames/Names/names.txt -X POST -d "username=FUZZ&email=x&password=x&cpassword=x" -H "Content-Type: application/x-www-form-urlencoded" -u http://SITE/customers/signup -mr "username already exists"`

### Brute force

Using valid usernames we can attempt a brute force attack on a login page for example:

`ffuf -w valid_usernames.txt:W1,/usr/share/wordlists/SecLists/Passwords/Common-Credentials/10-million-password-list-top-100.txt:W2 -X POST -d "username=W1&password=W2" -H "Content-Type: application/x-www-form-urlencoded" -u http://SITE/customers/login -fc 200`

### Logic flaws

A logic flaw is when the typical logical path of an application is either bypassed, circumvented or manipulated by a hacker.

## IDOR

IDOR stands for Insecure Direct Object Reference and is a type of access control vulnerability.

When passing data from page to page either by post data, query strings, or cookies, web developers will often first take the raw data and encode it. Encoding changes binary data into an ASCII string commonly using the a-z, A-Z, 0-9 and = character for padding. The most common encoding technique on the web is base64 encoding and can usually be pretty easy to spot.

Other than encoding also hashes should be checked.

If the Id cannot be detected using the above methods, an excellent method of IDOR detection is to create two accounts and swap the Id numbers between them. If you can view the other users' content using their Id number while still being logged in with a different account (or not logged in at all), you've found a valid IDOR vulnerability.

### Where are they located?
The vulnerable endpoint you're targeting may not always be something you see in the address bar. It could be content your browser loads in via an AJAX request or something that you find referenced in a JavaScript file. 



Sometimes endpoints could have an unreferenced parameter that may have been of some use during development and got pushed to production. For example, you may notice a call to /user/details displaying your user information (authenticated through your session). But through an attack known as parameter mining, you discover a parameter called user_id that you can use to display other users' information, for example, /user/details?user_id=123.

## File inclusion

### Path Traversal

The attacker exploits this vulnerability by manipulating and abusing the web application's URL to locate and access files or directories stored outside the application's root directory.

If the attacker finds the entry point, like `get.php?file=`, then the attacker may send something as follows, `http://webapp.thm/get.php?file=../../../../etc/passwd`

### Local File Inclusion (LFI)

With PHP, using functions such as include, require, include_once, and require_once often contribute to vulnerable web applications. PHP as an example, but  LFI vulnerabilities also occur when using other languages such as ASP, JSP, or even in Node.js apps. LFI exploits follow the same concepts as path traversal.

Example of abusing a lang query:

`http://webapp.com/index.php?lang=../../../../etc/passwd`

#### Steps for testing:

- Find an entry point that could be via GET, POST, COOKIE, or HTTP header values!
- Enter a valid input to see how the web server behaves.
- Enter invalid inputs, including special characters and common file names.
- Don't always trust what you supply in input forms is what you intended! Use either a browser address bar or a tool such as Burpsuite.
- Look for errors while entering invalid input to disclose the current path of the web application; if there are no errors, then trial and error might be your best option.
- Understand the input validation and if there are any filters!
- Try the inject a valid entry to read sensitive files

### Remote File Inclusion (RFI)

Remote File Inclusion (RFI) is a technique to include remote files into a vulnerable application. Like LFI, the RFI occurs when improperly sanitizing user input, allowing an attacker to inject an external URL into include function.

## SSRF

SSRF stands for Server-Side Request Forgery. It's a vulnerability that allows a malicious user to cause the webserver to make an additional or edited HTTP request to the resource of the attacker's choosing.

Potential SSRF vulnerabilities can be spotted in web applications in many different ways. Four palces to look for:

- When a full URL is used in a parameter in the address bar
- A hidden field in a form
- A partial URL such as just the hostname
- Or perhaps only the path of the URL

### Circumventing common defences

Attackers can bypass a Deny List by using alternative localhost references such as 0, 0.0.0.0, 0000, 127.1, 127.*.*.*, 2130706433, 017700000001 or subdomains that have a DNS record which resolves to the IP Address 127.0.0.1 such as 127.0.0.1.nip.io.

 An attacker could quickly circumvent allow list rule by creating a subdomain on an attacker's domain name, such as https://website.com.attackers-domain.com

## Cross-site Scripting

