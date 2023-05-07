import styled from 'styled-components';

export const AppWrapper = styled.section`
width: 100%;
height: 100%;
display: flex;
.fileSearchBox-left{
  width: 30%;
  height: 100%;
}
.fileSearchBox-right{
  width: 70%;
  height: 100%;
  .tabListWrapper-header{
    width: 100%;
    height: 60px;
  }
  .start-page{
    font-size: 30px;
    height: 300px;
    line-height: 300px;
    color: #ccc;
    text-align: center;
  }
}
`;