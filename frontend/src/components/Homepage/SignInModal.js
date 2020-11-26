import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import $ from 'jquery'

//pop up Styling///////////////////////////// 
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
  width: 350px;
  height: 450px;
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
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
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
////////////////////////////////////
export const Modal = ({ showModal, setShowModal }) => {
  //pop up functionality 
  const modalRef = useRef();
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
                <form className="center-form">
                  <h3>Sign In</h3>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" ref={emailInput} className="form-control" placeholder="Enter email" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" ref={passInput} className="form-control" placeholder="Enter password" />
                  </div>
                  <small id="logPass"></small>
                  <div className="form-group">
                  </div>
                  <button type="button" className="btn btn-primary btn-block" onClick={() => {
                    var password = passInput.current.value
                    var email = emailInput.current.value
                    var data = {
                      userPass: password,
                      userMail: email
                    }
                    $.ajax({
                      type: "POST",
                      url: "/login",
                      data: data,
                      success: (res) => {
                        window.location.href = "/"
                      },
                      error: function (error) {
                        if (error.status === 410) {
                          //alert('Empty data')
                          document.getElementById("logPass").innerHTML = "<div class='alert alert-danger' role='alert'> You have to enter your email</div>"
                        }
                        if (error.status === 404) {
                          document.getElementById("logPass").innerHTML = "<div class='alert alert-danger' role='alert'> Invaild Email</div>"
                          //alert('user not existed')
                          console.log(error.responseText)
                        }
                        if (error.status === 400) {
                          //alert('wrong password')
                          document.getElementById("logPass").innerHTML = "<div class='alert alert-danger' role='alert'> Wrong Password</div>"
                        }
                      }
                    })
                  }}>Sign In</button>
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