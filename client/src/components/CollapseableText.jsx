import { useState } from 'react';

export const CollapseableText = ({ shortText, longText }) => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div>
      <div>
        {showFullText ? longText : shortText}
        {!showFullText && (
          <button className='readMore' onClick={() => setShowFullText(true)}>Read More</button>
        )}
        {showFullText && (
          <button className='readLess' onClick={() => setShowFullText(false)}>Read Less</button>
        )}
      </div>
    </div>
  );
};

export default CollapseableText;