import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';
// import maskedImageA from "./images/maskedImage.jpg"

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      result: null,
      srcImage: null,
      showPopup: false,
      maskedImage: null,
      imageFile:null,
      imageUrl:null,
      isLoading:false
    }  }
    togglePopup = () => {
      if (!this.state.isLoading){
        this.setState({
          showPopup: !this.state.showPopup
        });
      }
      
    }
    handleFileUpload = event => {
      const file = event.target.files[0];
      console.log(file)
      const reader = new FileReader();
      console.log(file)
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState({
          imageFile: file,
          imageUrl: reader.result
        });
      };
    }
  
    handleSubmit = event => {
      
      this.setState({
        isLoading: true
      })
      event.preventDefault();
      const formData = new FormData();
      formData.append("image", this.state.imageFile);

      axios
        .post("http://localhost:5000/upload", formData)
        .then((response) => {
          const filepath1 = response.data.file_path
          console.log(response)      
          this.setState({
            result: response.data.result
          })
          this.setState({ maskedImage: response.data.imageData,
          isLoading:false });    
        })
      this.togglePopup();
    }

  render() {
    return (
      ((this.state.showPopup && !this.state.isLoading)? (<div>
        {this.state.showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <h2>Upload Image</h2>
              <form onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleFileUpload} />
                
                <button type="submit">Upload</button>
                <button type="button" onClick={this.togglePopup}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>): (<div className='bodyBackground'>
      <div className='result-image'>
        <div className='container-main'>
            <div className='imageBox'>
              <div className='image'>
              {this.state.imageUrl && (
                  <img className = 'act-image' src={this.state.imageUrl}  />
                )}
              </div>
              <div className='button'>
                <h1> Source Image</h1>
              </div>
            </div>
            <div className='imageBox'>
              <div className='image'>
              {this.state.maskedImage && (
                <img className = 'act-image' src={`data:image/jpg;base64,${this.state.maskedImage}`} alt="Image"  />
                )}
              </div>
              <div className='button'>
              <h1>Masked Image </h1> 
              </div>
            </div>
        </div>
       <div className='result-box'>
          <div className='result-tag'>
          <h1> Result:  </h1>
          </div>
          {(this.state.result === "Tumor Positive") && <div className = 'result-datap'>
            <h1>{this.state.result}</h1>
          </div>}
          {(this.state.result === "Tumor Negative") && <div className = 'result-datan'>
            <h1>{this.state.result}</h1>
          </div>}
          
        </div>
        
        <div className='uploadButton' onClick={this.togglePopup}>
            <h3>Click Here To Upload a New Image</h3>
        </div>
      </div>
      {this.state.isLoading && <LoadingComponent />}
    </div>
    ))
      
    )
  }
}
