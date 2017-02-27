import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';
import update from "react-addons-update";



//4-1 검색기능
//4-2 클릭시 해당 데이터의 상세 데이터 출력
//4-3 ~ 4 원소 추가, 수정, 삭제

export default class Contact extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        selectedData: -1,
        keyword: "",
        contactData: [{
          name: 'Abet',
          phone: '010-0000-0001'
        },{
          name: 'Betty',
          phone: '010-0000-0002'
        },{
          name: 'James',
          phone: '010-0000-0003'
        },{
          name: 'David',
          phone: '010-0000-0004'
        },{
          name: 'Gangs',
          phone: '010-0000-0005'
        }]
        //hot loader은 constructor를 다시 실행 하지 않는다!! 새로고침을 하는 것이 좋다.
    };
    //임의의 메소드를 만들때는 this를 바인드 해주어야 한다.
    this.handleChange = this.handleChange.bind(this); // 바뀌는 메소드 바인딩
    this.handleClick = this.handleClick.bind(this); // 클릭 메소드 바인딩
    //추가 수정 삭제 함수 제공
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);


  }

  handleChange(e) {
      //e는 이벤트 객체이다.
      this.setState({
          keyword: e.target.value
      });
  }
  //click 메소드를 선언한다.
  handleClick(key){
    //선택한 데이터를 가져와 setState를 통해 저장한다.
    this.setState({
      selectedData: key
    });
    console.log(key,"is selected");

  }

  //세로운 원소를 추가하는 함수. $push 를 사용한다.
  handleCreate(newContact){
    this.setState({
      //update 모듈의 첫번째 인자로는 수정할 배열이나 객체를 보내준다. 두번째 인자로는 {$push}를 사용하여 새로운 인자를 넣는다.
      contactData: update(this.state.contactData, {$push: [newContact]})

    });

  }
  //Delete
  handleRemove(){
    this.setState({
      contactData: update(
        this.state.contactData,
        {$splice: [[this.state.selectedData, 1]]}
      ),
      selectedData: -1
    });
  }
  //Edit
  handleEdit(newName, newPhone){
    this.setState({
        contactData: update(this.state.contactData, {

          [this.state.selectedData]: {
            name : {$set: newName},
            phone : {$set: newPhone}
        }
      })
    });

  }




  render(){
    const mapToComponents = (data) => {
      data.sort();// 들어온 데이터를 abc순서로 sort해준다.
      // 해당 키워드가 들어간 값만 filter하여 가져 온다.
      data = data.filter(
          (value) => {
              //이름을 모두 소문자로 바꾸어서
              return value.name.toLowerCase()
                  .indexOf(this.state.keyword.toLowerCase()) > -1;
          }
      );
      return data.map((contact, i) => {
        return (<ContactInfo
          contact = {contact}
          key = {i}
          onClick = {() => {this.handleClick(i)}}
          />);
          //onclick 설정시 함수를 invoke시키면 안된다. 그렇기 때문에 고계 함수를 사용하여 해당 함수를 실행 시킨 결과를 리턴해 준다.
      });
    };

    return (
      <div>
        <h1>Contacts</h1>

        <input name="keyword" placeholder="Search"
                  value={this.state.keyword} onChange={this.handleChange}/>

        <div>{mapToComponents(this.state.contactData)}</div>

        <ContactDetails
          contact = {this.state.contactData[this.state.selectedData]}
          isSelected = {this.state.selectedData != -1}
          onRemove = {this.handleRemove}
          onEdit = {this.handleEdit}
          />

        <ContactCreate onCreate={this.handleCreate}/>
      </div>
    );
  }


}
