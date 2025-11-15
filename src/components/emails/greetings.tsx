import React from 'react'

const GreetingsEmail = ({ firstName }: { firstName: string }) => {
    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
			<p>You have been invited to join our Slack community by a company.</p>
			<p>Thanks for joining our community! We're excited to have you on board.</p>
			<p>Kindly click the link below to accept your invitation and start contributing the company.</p>
			<p><a href="https://www.slackapp.com">Accept Invitation</a></p>
        </div>
    )
}

export default GreetingsEmail
