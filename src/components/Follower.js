import React from 'react';

class Follower extends React.Component{
    render(){
        const { avatar_url:image, login:name, html_url:gitHubLink } = this.props;
        return <article className="card">
            <img src={image} alt={name}/>
            <h4>{name}</h4>
            <a href={gitHubLink} className="btn">
                View profile
            </a>
        </article>
    }
}

export default Follower;