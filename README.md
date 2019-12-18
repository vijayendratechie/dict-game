# Command Line Dictionary Tool

Command Line Dictionary is a tool to get definitions,synonyms and antonyms of words. It also provides the usage of words in example sentences. A game is built to guess the word given the definition,synonyms or antonyms of the word.

## Installation

1) Download the project from github. 
2) Navigate to the project folder from the command prompt.
3) Install the node modules using the command
```bash
C:\Users\vijju\Desktop\dict>npm install
```
4) To access the tool command globally, run
```bash
C:\Users\vijju\Desktop\dict>npm link
```
## Usage

```bash
C:\Users\vijju\Desktop\dict>dict defn <word> # Display definitions of given word

C:\Users\vijju\Desktop\dict>dict syn <word> # Display synonyms of given word

C:\Users\vijju\Desktop\dict>dict ant <word> # Display antonyms of given word

C:\Users\vijju\Desktop\dict>dict ex <word> # Display examples of usage of a given word in a sentence 

C:\Users\vijju\Desktop\dict>dict <word> # Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a given word

C:\Users\vijju\Desktop\dict>dict # Display Word Definitions, Word Synonyms, Word Antonyms & Word Examples for a random word

C:\Users\vijju\Desktop\dict>dict play # Play guess the word game
```