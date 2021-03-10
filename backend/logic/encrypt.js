export default function (char, shift) {
    const alphabet = [
        'A','B','C','D','E','F',
        'G','H','I','J','K','L',
        'M','N','O','P','Q','R',
        'S','T','U','V','W','X',
        'Y','Z'
    ];

    let include =        
     alphabet.includes(
        char.toUpperCase()); 
       
    if (include){      
     let position =         
      alphabet.indexOf(
       char.toUpperCase());
        
     let newPosition = 
      (position + shift) %  
        alphabet.length;
     return alphabet[newPosition];
   } else return char;
  }