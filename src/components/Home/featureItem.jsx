import React from 'react';

const FeatureItem = ({ featureItem }) => {
  return (
    <div className="feature-item">
      <img src={featureItem.iconSrc} alt={featureItem.iconAlt} className="feature-icon" />
      <h3 className="feature-item-title">{featureItem.title}</h3>
      <p>{featureItem.description}</p>
    </div>
  );
};

export default FeatureItem;


