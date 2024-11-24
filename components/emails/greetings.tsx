import React from 'react';

const GreetingsEmail = ({firstName}: {firstName:string}) => {
    return (
        <div>
        <h1>Welcome, {firstName}!</h1>
      </div>
    );
}

export default GreetingsEmail;
