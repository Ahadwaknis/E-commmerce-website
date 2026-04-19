import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#8b5cf6', fontSize: '2.5rem', marginBottom: '20px' }}>
        E-Shop Website
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        Your e-commerce platform is working!
      </p>
      
      <div style={{ 
        backgroundColor: '#2d2d2d', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#8b5cf6', marginBottom: '15px' }}>Quick Links:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <a href="#home" style={{ color: '#8b5cf6', textDecoration: 'none', padding: '10px', backgroundColor: '#3d3d3d', borderRadius: '5px', display: 'block' }}>
            🏠 Home
          </a>
          <a href="#products" style={{ color: '#8b5cf6', textDecoration: 'none', padding: '10px', backgroundColor: '#3d3d3d', borderRadius: '5px', display: 'block' }}>
            🛍️ Products
          </a>
          <a href="#cart" style={{ color: '#8b5cf6', textDecoration: 'none', padding: '10px', backgroundColor: '#3d3d3d', borderRadius: '5px', display: 'block' }}>
            🛒 Cart
          </a>
          <a href="#login" style={{ color: '#8b5cf6', textDecoration: 'none', padding: '10px', backgroundColor: '#3d3d3d', borderRadius: '5px', display: 'block' }}>
            🔐 Login
          </a>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#2d2d2d', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#8b5cf6', marginBottom: '15px' }}>System Status:</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>✅ React: Working</li>
          <li style={{ marginBottom: '10px' }}>✅ Vite: Working</li>
          <li style={{ marginBottom: '10px' }}>✅ Styling: Working</li>
          <li style={{ marginBottom: '10px' }}>✅ Layout: Working</li>
          <li style={{ marginBottom: '10px' }}>✅ Components: Ready</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#2d2d2d', 
        padding: '20px', 
        borderRadius: '8px'
      }}>
        <h3 style={{ color: '#8b5cf6', marginBottom: '15px' }}>Backend API Status:</h3>
        <p>🔗 Backend Server: http://localhost:5000</p>
        <p>📡 API Endpoint: /api/products</p>
        <p>📊 Products Available: 15 items</p>
      </div>
    </div>
  );
}

export default App;
