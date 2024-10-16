# John the Ripper

John the Ripper is one of the most well known, well-loved and versatile hash cracking tools out there. It combines a fast cracking speed, with an extraordinary range of compatible hash types. This room will assume no previous knowledge, so we must first cover some basic terms and concepts before we move into practical hash cracking.

## John Basic Syntax
The basic syntax of John the Ripper commands is as follows.

`john [options] [path to file]`

`john` - Invokes the John the Ripper program

`[path to file]` - The file containing the hash you're trying to crack, if it's in the same directory you won't need to name a path, just the file.

## Automatic Cracking

John has built-in features to detect what type of hash it's being given, and to select appropriate rules and formats to crack it for you, this isn't always the best idea as it can be unreliable- but if you can't identify what hash type you're working with and just want to try cracking it, it can be a good option! To do this we use the following syntax:

`john --wordlist=[path to wordlist] [path to file]`

`--wordlist=` - Specifies using wordlist mode, reading from the file that you supply in the following path...

`[path to wordlist]` - The path to the wordlist you're using.

### Identifying Hashes
Sometimes John won't play nicely with automatically recognising and loading hashes, that's okay! We're able to use other tools to identify the hash, and then set john to use a specific format.

To use hash-identifier, pull the python file from gitlab using: wget https://gitlab.com/kalilinux/packages/hash-identifier/-/raw/kali/master/hash-id.py.

Launch it with `python3 hash-id.py` and then enter the hash you're trying to identify.


## Format-Specific Cracking
Once you have identified the hash that you're dealing with, you can tell john to use it while cracking the provided hash using the following syntax:

`john --format=[format] --wordlist=[path to wordlist] [path to file]`

`--format=` - This is the flag to tell John that you're giving it a hash of a specific format, and to use the following format to crack it

`[format]` - The format that the hash is in

## Cracking Hashes from /etc/shadow

ohn can be very particular about the formats it needs data in to be able to work with it, for this reason- in order to crack /etc/shadow passwords, you must combine it with the /etc/passwd file in order for John to understand the data it's being given. To do this, we use a tool built into the John suite of tools called unshadow. The basic syntax of unshadow is as follows:

`unshadow [path to passwd] [path to shadow]`

`unshadow` - Invokes the unshadow tool

`[path to passwd]` - The file that contains the copy of the /etc/passwd file you've taken from the target machine

`[path to shadow]` - The file that contains the copy of the /etc/shadow file you've taken from the target machine

We're then able to feed the output from unshadow, in our example use case called "unshadowed.txt" directly into John.

## Cracking a Password Protected Zip File

Similarly to the unshadow tool that we used previously, we're going to be using the zip2john tool to convert the zip file into a hash format that John is able to understand, and hopefully crack. The basic usage is like this:

`zip2john [options] [zip file] > [output file]`

`[options]` - Allows you to pass specific checksum options to zip2john, this shouldn't often be necessary

`[zip file]` - The path to the zip file you wish to get the hash of

`>` - This is the output director, we're using this to send the output from this file to the...

`[output file]` - This is the file that will store the output from

We're then able to take the file we output from zip2john in our example use case called "zip_hash.txt" and, as we did with unshadow, feed it directly into John as we have made the input specifically for it.

### Cracking a RAR Archive

Similar to Zip files but use `rar2john`.

### SSH Key Passwwords

Similar to zip files but use `ssh2john`

`ssh2john [id_rsa private key file] > [output file]`