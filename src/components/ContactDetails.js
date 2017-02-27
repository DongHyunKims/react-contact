import React from 'react';
// 클릭된 데이터의 상세 정보를 렌더링 하기 위해 만든 파일.

export default class ContactDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      name: "",
      phone: ""
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  // 이 메소드는 false이면 true로 true면 false로 바꾸어 준다.

  handleToggle(){
    //만약 this.state.isEdit이 거짓이면 이름을 바꾸고
    if(!this.state.isEdit){
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
      });
    }else{
      this.props.onEdit(this.state.name,this.state.phone);
    }
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  handleChange(event){
    let nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  render(){
    /*
    기존의 정보 나타내는 부분을 read 로 분리,
    edit 라는 상수를 임시로 설정
    isEdit 값에 따라 read 보여줄지 edit 보여줄지 결정
    */

    const read = (
      <div>
      <p> { this.props.contact.name } </p>
      <p> { this.props.contact.phone }</p>
      </div>
    );
    const edit = (
      <div>
        <p>
          <input type="text" name="name" placeholder="name"
          value={this.state.name} onChange={this.handleChange}
          />
        </p>
        <p>
          <input type="text" name="phone" placeholder="phone"
          value={this.state.phone} onChange={this.handleChange}
          />
        </p>
      </div>

    );

    //결과 페이지를 렌더링 한다.
      //isEdit 값에 따라 버튼의 텍스트를 바꾼다.
    const details = (
      <div>
        {this.state.isEdit ? edit : read}
        <p>

        <button onClick={this.handleToggle}>{this.state.isEdit ? 'OK' : 'Edit' }</button>
        <button onClick={this.props.onRemove}>Remove</button>
        </p>
      </div>
    );
    //비어있는 페이지를 렌더링 한다.
    const blank = (
      <div> Noting is Selected </div>
    );

    return(
    <div>
      <h2>Details</h2>
      {this.props.isSelected ? details : blank}
    </div>
  )
  }
}


//contactDetails의 default값을 설정한다.
ContactDetails.defaultProps = {
  contact:{
    name: "",
    phone: ""
  }
}
