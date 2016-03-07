import React from "react";
import ReactDOM from "react-dom";

let Header = React.createClass({
  render: function(){
    return(
      <header>
        <div className="heroImage">
          <img src="./img/main.jpg" alt="" />
        </div>
        <h1>
          Sunny<br />Day<br />Code
        </h1>
        <ul className="menu">
          <li><a href="#">Development</a></li>
          <li><a href="#">Movie</a></li>
        </ul>
        <p className="subTxt">
          As you know, it is the most important event of the year.<br />
          The parents will be scrutinizing our every move, so I find it's best to over-prepare.<br />
          Right? The best defense is a good offense.
        </p>
      </header>
    );
  }
});

let MainDev = React.createClass({
  propTypes: {
    isScrollFlg: React.PropTypes.bool.isRequired,
    handleScroll: React.PropTypes.func.isRequired
  },
  _handleScroll: function(e){
    this.props.handleScroll(e);
  },
  render: function(){
    return(
      <section>
        <h2>Development</h2>
        <p className="description">
          cokoha thukut tamono wonoseteru contents desu
        </p>
        <div className="devBox">
          <div className={this.props.isScrollFlg ? "devBox__cont cont1 anime" : "devBox__cont"} >
            <img src="./img/github.svg" alt="" />
            <p>Github</p>
          </div>
          <div className={this.props.isScrollFlg ? "devBox__cont cont2 anime" : "devBox__cont"} >
            <img src="./img/blog.svg" alt="" />
            <p>blog</p>
          </div>
          <div className={this.props.isScrollFlg ? "devBox__cont cont3 anime" : "devBox__cont"} >
            <img src="./img/codepen.svg" alt="" />
            <p>codepen</p>
          </div>
        </div>
      </section>
    );
  },
  componentDidMount: function(){
    let self = this;
    window.addEventListener('scroll', function(e){
      self._handleScroll(e);
    });
  }
});

let MainMovie = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function(){
    let itemList = this.props.data.map(function(item, i){
      let today = new Date();
      let xday  = new Date(item.y, item.m-1, item.d);
      let dayMS = 24*60*60*1000;
      let n = Math.floor((xday.getTime()-today.getTime())/dayMS)+1;

      return(
        <div className="movieList__item" key={i}>
          <a href={item.url} target="_blank">
            <div className="movieList__item__img"><img src={"./img/movie/" + item.img} alt="" /></div>
            <p className="movieList__item__title">{item.title}</p>
            <p className="movieList__item__release">{item.m}/{item.d} (After {n} days)</p>
          </a>
        </div>
      );
    });
    return(
      <section className="oddSec">
        <h2>Movie</h2>
        <p className="description">
          2016 of the public movie I'm looking forward.
        </p>
        <div className="movieList">
          {itemList}
        </div>
      </section>
    );
  }
});

let Footer = React.createClass({
  render: function(){
    return(
      <footer>
        <h2>About</h2>
      </footer>
    );
  }
});

// 親コンポーネント
let Contents = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },
  getDefaultProps: function(){
    return {
      data: []
    };
  },
  getInitialState: function() {
    return {
      isScrollFlg: false
    };
  },
  componentWillMount: function(){

    let promise = Promise.resolve($.ajax({
      type: "GET",
      url: "./data/data.json",
      dataType: "json"
    }));

    promise.then((resolve) => {
      ReactDOM.render(
        <Contents data={resolve} />,
        document.getElementById('content')
      );
    });
  },
  render: function(){
    return(
      <div>
        <Header />
        <main>
          <MainDev isScrollFlg={this.state.isScrollFlg} handleScroll={this.handleScroll} />
          <MainMovie data={this.props.data} />
        </main>
        <Footer />
      </div>
    );
  },
  // scroll
  handleScroll: function(e){
    console.log(e.srcElement.body.scrollTop);
    if(e.srcElement.body.scrollTop > 300){
      this.setState({
        isScrollFlg: true
      });
    }
  }
});


ReactDOM.render(
  <Contents />,
  document.getElementById('content')
);
