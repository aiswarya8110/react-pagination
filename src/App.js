import './App.css';
import React from 'react';
import Follower from './components/Follower';
import paginate from './utils/paginate';

const url = "https://api.github.com/users/john-smilga/followers?per_page=100"

class App extends React.Component{
  constructor(){
    super();
    this.state = {loading: true, followers: null, page: 0};
    this.prevBtnHandler = this.prevBtnHandler.bind(this);
    this.nextBtnHandler = this.nextBtnHandler.bind(this);
  }

  async getData(){
    const response = await fetch(url);
    const _followers = await response.json();
    this.data = paginate(_followers);
    this.setState({followers: this.data[this.state.page], loading: false});
  }
 
  componentDidMount(){
    this.getData();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.page !== this.state.page){
      this.setState({followers: this.data[this.state.page]});
    }
  }

  nextBtnHandler(){
    this.setState((prevState)=>{
      if(prevState.page + 1 > this.data.length - 1){
        return {page: 0}
      }
      return {page: prevState.page + 1}
    })
  }

  prevBtnHandler(){
    this.setState((prevState)=>{
      if(prevState.page - 1 < 0){
        return {page: this.data.length - 1}
      }

      return {page: prevState.page - 1}
    })
  }

  render(){
    console.log(this.state.page);
    return <main>
      <div className="section-title">
        <h1>{this.state.loading ? 'Loading...' : 'GitHub Profiles'}</h1>
        <div className="underline" />
        <section className="followers">
          <div className="container">
           {this.state.followers?.map((item)=>{
            return <Follower key={item.id} {...item} />
           })}
          </div>
          {!this.state.loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={this.prevBtnHandler}>prev</button>
            {this.data.map((_, index)=>{
              return (
              <button key={index} className={`${index === this.state.page && 'active-btn'} page-btn`} onClick={()=> this.setState({page: index})}>
                {index + 1}
              </button>
            )
            })}
            <button onClick={this.nextBtnHandler} className="next-btn">next</button>
          </div>)
          }
        </section>
      </div>
    </main>
  }
}

export default App;
