#!/usr/bin/env node

const axios = require('axios');
const inquirer = require('inquirer');

let apihost = 'https://fourtytwowords.herokuapp.com';
let api_key = "b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164";

let option = process.argv[2];
let word = process.argv[3];

//DEFINATION OF WORDS
async function defn(word)
{
  let data = await axios.get(apihost+'/word/'+word+'/definitions?api_key='+api_key)
			  .then(function (response) {
			    return (response.data);
			  })
			  .catch(function (error) {
			    return 0;			    
			  })	
	return data;
};


//RANDOM WORDS
async function randomWord()
{
	let data = await axios.get(apihost+'/words/randomWord?api_key='+api_key)
					.then(function (response) {
					// handle success
						return (response.data.word);
					})
					.catch(function (error) {
					// handle error
						return 0;	
					})	
	return data;
}


//SYNONYMS AND ANTONYMS
async function relatedWords(word,wordtype)
{
  let data = await axios.get(apihost+'/word/'+word+'/relatedWords?api_key='+api_key)
				  .then(function(response) {
				  	
			  		let synwords,antwords;
			  
				  	for(let i=0;i<response.data.length;i++)
					{
						obj = response.data[i];
						
						if(obj.relationshipType === 'antonym' && wordtype === 'ant')
						{
							antwords = obj.words;
							return antwords;															
						}
						else if(obj.relationshipType === 'synonym' && wordtype === 'syn')
						{
							synwords = obj.words;
							return synwords;	
						}
					}	
					return 1;
				  	  	
				  })
				  .catch(function (error) {
				    // handle error
				  	return 0;
				  });
	return data;	
};


//EXAMPLE SENTENCES USING THE WORD
async function examples(word)
{
    let data = await axios.get(apihost+'/word/'+word+'/examples?api_key='+api_key)
			  .then(function (response) {
			    // handle success
			    return (response.data);
			  })
			  .catch(function (error) {
			    // handle error
			   	return 0;
			  });
	return data;		  
};


//TO DISPLAY DEFINATION AND EXAMPLES
function displaySentence(sentencearr)
{
	for(let i=0;i<sentencearr.length;i++)
	{
		console.log((i+1)+") "+sentencearr[i].text+"\n");
	}
}

//TO DISPLAY SYNONYMS AND ANTONYMS
function displayRelatedWords(wordsarr)
{
	for(let i=0;i<wordsarr.length;i++)
	{
		console.log((i+1)+") "+wordsarr[i]);
	}
}

//TO DISPLAY ALL DETAILS OF A WORD
async function displayAll(word)
{
	let defination = await defn(word);
	let synwords = await relatedWords(word,'syn');
	let antwords = await relatedWords(word,'ant');
	let ex = await examples(word);
	if(defination === 0)
	{
		console.log("\nError while finding word full dict");
	}
	else if(antwords === 1)
	{
		console.log("\nWord is : "+word.toUpperCase());
		console.log("\nDefinations of '"+word.toUpperCase()+"' are : ");	
		displaySentence(defination);
		console.log("\nSynonyms are : ");
		displayRelatedWords(synwords);
		console.log("\nNo antonyms for given word");
		console.log("\nExamples for '"+word.toUpperCase()+"' are : ");	
		displaySentence(ex.examples);

	}
	else
	{
		console.log("\nWord is : "+word.toUpperCase());
		console.log("\nDefination of '"+word.toUpperCase()+"' are : ");	
		displaySentence(defination);
		console.log("\nSynonyms are : ");
		displayRelatedWords(synwords);
		console.log("\nAntonyms are : ");
		displayRelatedWords(antwords);
		console.log("\nExamples for '"+word.toUpperCase()+"' are : ");	
		displaySentence(ex.examples);
	}
}

//MAIN FUNCTION
async function run()
{
	switch(option)
	{
		//Word Definitions
		case 'defn' : 
		{
			//console.log("defn");
	 		if(typeof word === 'undefined')
	 		{
	 			console.log("\nNo Word Entered");
	 		}
	 		else
	 		{
	 			let defination = await defn(word);	
	 			if(defination === 0)
	 			{
	 				console.log("\nError while finding defination");	
	 			}
	 			else
	 			{
	 				console.log("\nDefinations of '"+word.toUpperCase()+"' are : ");	
	 				displaySentence(defination);
	 			}
	 			
	 		} 		
	 		break;	
		}
		//Word Synonyms
		case 'syn' : 
		{
			//console.log("syn");
	 		if(typeof word === 'undefined')
	 		{
	 			console.log("\nNo Word Entered");
	 		}
	 		else
	 		{
	 			let synwords = await relatedWords(word,'syn');	
	 			if(synwords === 0)
	 			{
	 				console.log("\nError while finding synonyms");	
	 			}
	 			else if(synwords === 1)
	 			{
	 				console.log("\nNo synonyms for given word");	
	 			}
	 			else
	 			{
	 				console.log("\nSynonyms are : ");
	 				displayRelatedWords(synwords);
	 			}
	 			
	 		} 		
	 		break;	
		}
		//Word Antonyms
		case 'ant' : 
		{
			//console.log("ant");
	 		if(typeof word === 'undefined')
	 		{
	 			console.log("\nNo Word Entered");
	 		}
	 		else
	 		{
	 			let antwords = await relatedWords(word,'ant');	
	 			if(antwords === 0)
	 			{
	 				console.log("\nError while finding antonyms");	
	 			}
	 			else if(antwords === 1)
	 			{
	 				console.log("\nNo antonyms for given word");	
	 			}
	 			else
	 			{
	 				console.log("\nAntonyms are : ");
	 				displayRelatedWords(antwords);
	 			}
	 		} 		
	 		break;	
		}
		//Word Examples
		case 'ex' :
		{
			console.log("ex");
			if(typeof word === 'undefined')
	 		{
	 			console.log("\nNo Word Entered");
	 		}
	 		else
	 		{
	 			let ex = await examples(word);
	 			if(ex === 0)
	 			{
	 				console.log("\nError while finding examples");	
	 			}
	 			else
	 			{
	 				console.log("\nExamples for '"+word.toUpperCase()+"' are : ");	
	 				displaySentence(ex.examples);
	 			}
	 		}
	 		break;
		}
		case 'play' :
		{
			let arrindex,seed=3;
			let randword = await randomWord();
			let defination = await defn(randword);
			let synwords = await relatedWords(randword,'syn');
			let antwords = await relatedWords(randword,'ant');
			//console.log(synwords);
			if(defination === 0 || synwords === 0 || antwords === 0)
			{
				console.log("Error!! Please try again");
			}
			else if(antwords === 1)
			{
				seed = 2;
			}


			let randnum = Math.floor(Math.random() * seed);
			//console.log(randnum);

			//DISPLAY DEFINATION,SYNONYM OR ANTONYM OF WORD
			if(randnum === 0)
			{
				arrindex = Math.floor(Math.random() * defination.length);				
				console.log("Guess the word whose defination is : \n"+defination[arrindex].text);	
				displayPrompt(defination,randword,synwords,antwords,arrindex,0);
			}
			else if(randnum === 1)
			{
				arrindex = Math.floor(Math.random() * synwords.length);				
				console.log("Guess the word whose Synonym is : "+synwords[arrindex]);
				displayPrompt(defination,randword,synwords,antwords,arrindex,1);
			}
			else
			{
				arrindex = Math.floor(Math.random() * antwords.length);				
				console.log("Guess the word whose Antonym is : "+antwords[arrindex]);
				displayPrompt(defination,randword,synwords,antwords,arrindex,2);
			}		
			break;
		}		
		default : 
		{
			//Word Full Dict
			if(typeof option !== 'undefined')
			{
				let word = option;
				displayAll(word);
				
			}
			else if(typeof option === 'undefined') //Word of the Day Full Dict
			{
				let randword = await randomWord();
				displayAll(randword);
			}
		}			
		break;
	}
}

run();

//DISPLAY PROMPT FOR USER TO GIVE INPUT
function displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag)
{
	inquirer
	  .prompt([
	    {
	      name: 'word',
	      message: '\nEnter the word',
	      default: 'No Word Entered',
	    },
	  ])
	  .then(answers => {
	    //console.log(synwords);

	    if(answers.word === 'No Word Entered')
		{
			console.log("\nYou have not entered any word");
			menu(defination,randword,synwords,antwords,arrindex,optionflag) //Show menu;
			
		}
		else if(answers.word === randword)
		{
			console.log("\nYou have guessed the correct word.");
		}
		else
		{
			let checkflag = false;
			for(let i=0;i<synwords.length;i++)
			{
				if(answers.word === synwords[i])
				{
					if(optionflag === 1 && answers.word === synwords[arrindex])
					{
						break;
					}
					else
					{
						checkflag = true;
						break;	
					}					
				}
			}			    	
			if(checkflag)
			{
				console.log("\nYou have guessed the correct synonym of the word");
			} 
			else
			{
				console.log("\nWrong guess");
				menu(defination,randword,synwords,antwords,arrindex,optionflag);		  
				
			}
		}			    
  });
}

//OPTION MENU
function menu(defination,randword,synwords,antwords,arrindex,optionflag)
{
	inquirer
	  .prompt([
	    {
	      type : 'rawlist',	
	      name: 'choice',
	      message: '\nMenu : ',
	      choices: ['Try Again','Hint','Quit']
	    },
	  ])
	  .then(answers => {
	  	console.log('Answer:', answers.choice);
	  	switch(answers.choice)
	  	{
	  		case 'Try Again' : 
	  			displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);
	  			break;
	  		case 'Hint' : 
	  		{
	  			let seed;
	  			if(antwords === 1)
	  			{
	  				seed = 3;
	  			}
	  			else
	  			{
	  				seed = 4;
	  			}

	  			let randnum = Math.floor(Math.random() * seed);

	  			if(randnum === 0)   //SHOW JUMBLED FOR WORD AS HINT
	  			{
	  				let jumbleword = jumbleWord(randword);
		  			console.log("\nHint : Jumbled form of the word is - "+jumbleword);
		  			displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);	
	  			}
	  			else if(randnum === 1)    //SHOW SYNONYM OF WORD AS HINT
	  			{
	  				let synhint;
	  				if(optionflag === 1)
	  				{
	  					synhint = hint(synwords,arrindex);
	  					console.log("\nHint : Synonym of the word is - "+synhint);	
	  					displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);
	  				}
	  				else
	  				{
	  					synhint = hint(synwords,null);
	  					console.log("\nHint : Synonym of the word is - "+synhint);	
	  					displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);
	  				}	  				
	  			}	
	  			else if(randnum === 2)    //SHOW DEFINATION OF WORD AS HINT
	  			{
	  				let defhint;
	  				if(optionflag === 0)
	  				{
	  					defhint = hint(defination,arrindex);
	  					console.log("\nHint : Defination of the word is - \n"+defhint.text);	
	  					displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);
	  				}
	  				else
	  				{
	  					defhint = hint(defination,null);
	  					console.log("\nHint : Defination of the word is - \n"+defhint.text);	
	  					displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);
	  				}
	  			}  	
	  			else if(randnum === 3)   //SHOW ANTONYM OF WORD AS HINT IF ANTONYMS OF THE WORD EXISTS
	  			{
	  				let anthint;
	  				if(optionflag === 2)
	  				{
	  					anthint = hint(antwords,arrindex);
	  					console.log("\nHint : Antonym of the word is - "+anthint);	
	  					displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);
	  				}
	  				else
	  				{
	  					anthint = hint(antwords,null);
	  					console.log("\nHint : Antonym of the word is - "+anthint);	
	  					displayPrompt(defination,randword,synwords,antwords,arrindex,optionflag);
	  				}
	  			}		
	  		}
	  		break;
	  		case 'Quit' : 
	  		{
	  			displayAll(randword);
	  		}
	  		default : break;
	  	}							  	
	  });
}

//JUMBLE WORD
function jumbleWord(randword)
{
	let jumbleword = randword.split('');

	//Shuffle the remaining letters
	for (let i = jumbleword.length - 1; i > 0; i--)
	{
		let j = Math.floor(Math.random() * (i + 1));
	    [jumbleword[i], jumbleword[j]] = [jumbleword[j], jumbleword[i]];
	}

	return jumbleword.join("");
}

//TO GENERATE ANOTHER SYNONYM,DEFINATION,ANTONYM AS HINT
function hint(arr,displayedwordindex)
{
	let generatedarrindex;
	while(true)
	{
		generatedarrindex = Math.floor(Math.random() * arr.length);

		if(displayedwordindex === null)      
		{	
			break;			
		}
		else if(generatedarrindex != displayedwordindex)     //NOT DISPLAY THE SAME CONTENT AS HINT THAT IS USED AS QUESTION
		{
			break;
		}
	}
	return arr[generatedarrindex];
}

