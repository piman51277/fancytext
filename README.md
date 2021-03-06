# fancytext
This repo contains an algorithm and tools to create text such as below: 

           _ _ _ _     _ _ _ _ _   _ _ _ _ _   _ _ _ _ _   _ _     _   _ _ _ _ _   _ _ _       _ _ _ _ _   _ _ _ _ _   _ _ _ _ _    
          /  _ _ _/_  /_ _   _ _/ /  _   _  / /  _ _ _  / /   /   / / /  _ _ _ _/ /_ _  /     /_ _ _ _  / /_ _ _ _  / /_ _ _ _  /   
         / /     / /     / /     / / / / / / / /     / / /  _/_  / / / /             / /             / /         / /         / /    
        / /_ _ _/_/     / /     / / / / / / / /_ _ _/ / / / / / / / / /_ _ _ _      / /      _ _ _ _/ /         / /         / /     
       /  _ _ _/       / /     / / /_/ / / /  _ _ _  / / / / / / / /_ _ _ _  /     / /     /  _ _ _ _/         / /         / /      
      / /             / /     / /     / / / /     / / / / /_/_/ /         / /     / /     / /                 / /         / /       
     / /          _ _/ /_ _  / /     / / / /     / / / /   /   /  _ _ _ _/ /  _ _/ /_ _  / /_ _ _ _          / /         / /        
    /_/         /_ _ _ _ _/ /_/     /_/ /_/     /_/ /_/   /_ _/ /_ _ _ _ _/ /_ _ _ _ _/ /_ _ _ _ _/         /_/         /_/         

- `algorithm.js` - This contains the algorithm used 
Takes an array of strings as input 
Outputs an array of strings that makes up the "image"  
Sample input: 
  [
  '11111',
  '00100',
  '00100',
  '00100',
  '00100',
  '00100',
  '11111'
  ]

Sample output: 
    [
    '         _ _ _ _ _ ',
    '       /_ _   _ _/',
    '         / /',
    '        / /',
    '       / /',
    '      / /',
    '  _ _/ /_ _',
    '/_ _ _ _ _/'
    ]

- `chacterCreate` - A small webpage to help create character strings used in character dictionaries
- `createDictionary` - A small tool to assist in creating a character dictionary
- `displaybulk` - A script to use a dictionary to create an image from string input alone
