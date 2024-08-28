import React, { useState } from 'react';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('sst', file);

    const response = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });

    const blob = await response.blob();
    setImage(URL.createObjectURL(blob));
  };

  return (
    <div>
      <h1>Sea Surface Temperature Map</h1>
      <input type="file" onChange={handleFileUpload} />
      {image && <img src={image} alt="Sea Surface Temperature" />}
    </div>
  );
};

export default App;
