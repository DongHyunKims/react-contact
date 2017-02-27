import React from 'react';

//추가하기위한 input과 버튼을 가진 컴포넌트 생성.
export default class ContactCreate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      phone: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  //input 박스안에 내용을 씉때 state의 이름을 박스 안의 내용으로 바꾼다.
  handleChange(event){
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleClick(){
   const contact = {
     name: this.state.name,
     phone: this.state.phone
   };
   // 가져온 handleCreate 함수의 파라메터로 바뀐 값을 넣고 추가.
   this.props.onCreate(contact);
   //다시 값을 초기화 해준다.
   this.setState({
     name: '',
     phone: ''
   });
 }


  render(){
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
          <input type="text" name="name" placeholder="name"
          value={this.state.name} onChange={this.handleChange}
          />
          <input type="text" name="phone" placeholder="phone"
          value={this.state.phone} onChange={this.handleChange}
          />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }

}
