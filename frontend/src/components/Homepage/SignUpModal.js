import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import $ from 'jquery'

//SignUp popUp style
const Background = styled.div`
  width: 1000%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalWrapper = styled.div`
  width: 380px;
  height: 480px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 1;
  color: #141414;
  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: large;
    float: left;
  }
  button {
    padding: 10px 24px;
    background: #ff9900;
    color: #fff;
    border: none;
    width: 310px;
  }
  label{
    font-size: large;
    float: left;
  }
`;
const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const Modal2 = ({ showModal, setShowModal, test }) => {
  const modalRef = useRef();
  //user data Refs
  var textInput = React.createRef();
  var passInput = React.createRef();
  var emailInput = React.createRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );
  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContent>
                <form>
                  <h3>Sign Up</h3>
                  <div className="form-group">
                    <label>user name</label>
                    <input type="text" className="form-control" ref={textInput} placeholder="First name" />
                  </div>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" ref={emailInput} placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" id='password' ref={passInput} className="form-control" placeholder="Enter password" />
                  </div>
                  <small id="matchPass" style={{ fontSize: '12px' }}></small>
                  <button type="button" onClick={async () => {
                    var password = passInput.current.value
                    var username = textInput.current.value
                    var email = emailInput.current.value
                    if (!validateEmail(email)) {
                      document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'>Wrong Email</div>"
                    }
                    else {
                      var data1 = {
                        userName: username,
                        userMail: email,
                        userPass: password
                      }
                      $.ajax({
                        type: "POST",
                        url: "/signup",
                        data: data1,
                        success: function (res) {
                          console.log("it's working")
                          window.location.href = "/"
                        },
                        error: function (error) {
                          if (error.status === 451) {
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your name</div>"
                          }
                          if (error.status === 411) {
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your email</div>"
                          }
                          if (error.status === 421) {
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your password</div>"
                          }
                          if (error.status === 406) {
                            document.getElementById("matchPass").innerHTML = "<div class='alert alert-danger' role='alert'> This email has been used</div>"
                          }
                        }
                      })
                    }
                  }} className="btn btn-primary btn-block">Sign Up</button>

                </form>
              </ModalContent>
              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};

function validateEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}