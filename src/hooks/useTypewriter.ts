import { useState, useEffect } from 'react';

export function useTypewriter(words: string[], typingSpeed: number = 100, deletingSpeed: number = 50, pauseTime: number = 1500) {
  const [index, setIndex] = useState(0);
  const [subString, setSubString] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [, setBlink] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlink(prev => !prev);
    }, 500);
    return () => clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const currentWord = words[index % words.length];
    
    const type = () => {
      setSubString(prev => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1);
        } else {
          return currentWord.substring(0, prev.length + 1);
        }
      });

      // Determine typing speed
      let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

      // If finished typing word
      if (!isDeleting && subString === currentWord) {
        typeSpeed = pauseTime;
        setIsDeleting(true);
      } 
      // If finished deleting
      else if (isDeleting && subString === '') {
        setIsDeleting(false);
        setIndex(prev => prev + 1);
        typeSpeed = 500; // Pause before starting new word
      }

      setTimeout(type, typeSpeed);
    };

    console.log(type)

    // We can't strictly use setTimeout recursively inside useEffect without cleanup issues or closure staleness if not careful.
    // A better approach for React is a simple timeout that depends on the state changes.
    // However, the recursive timeout inside useEffect with [] dependency is tricky with stale state.
    // Let's use a standard implementation that reacts to state changes.
    
  }, []); // Abandoned this verify-logic block for the actual implementation below.
  
  return subString;
}

// Re-writing the hook correctly below to avoid closure staleness
export function useTypewriterEffect(words: string[], typingSpeed: number = 150, deletingSpeed: number = 100, pauseTime: number = 2000) {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

    useEffect(() => {
      // eslint-disable-next-line prefer-const
        let timer: ReturnType<typeof setTimeout>;

        const handleTyping = () => {
            const i = loopNum % words.length;
            const fullText = words[i];

            setText(isDeleting 
                ? fullText.substring(0, text.length - 1) 
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

            if (!isDeleting && text === fullText) {
                setTypingSpeedState(pauseTime);
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeedState(500);
            }
        };

        // eslint-disable-next-line prefer-const
        timer = setTimeout(handleTyping, typingSpeedState);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseTime]);

    return text;
}
