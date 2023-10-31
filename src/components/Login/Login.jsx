import React from 'react';

function Login() {
  return (
    <div>
      <button
        onClick={async () => {
          try {
            const response = await fetch(
              'http://localhost:3000/login/facebook'
            );
            console.log(response);
          } catch (err) {
            console.error(err);
          }
        }}
      ></button>
    </div>
  );
}

export default Login;
