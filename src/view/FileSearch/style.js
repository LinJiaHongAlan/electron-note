import styled from 'styled-components';

export const FileSearchWrapper = styled.section`
width: 100%;
height: 100%;
.fileSearch-header{
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.fileSearch-listbox{
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: auto;
  .fileSearch-rowbox {
    .fileSearch-row{
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    &:nth-child(odd) {
      background-color: #fafafa;
    }
    .fileSearch-row-left{
      display: flex;
      flex: 1;
      .fileSearch-row-left-icon{
        padding: 0 10px;
      }
    }
    .fileSearch-row-right{
      display: flex;
      flex-shrink: 0;
      padding: 0 10px;
      justify-content: space-around;
      .fileSearch-row-right-icon{
        cursor: pointer;
        padding: 0 10px;
      }
    }
  }
  }
}
`;