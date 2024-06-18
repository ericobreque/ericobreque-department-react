import './App.css';
import { Breadcrumb, Layout, theme } from 'antd';
import DepartmentTable from './components/DepartmentTable';
import Navbar from './components/Navbar';
import HeaderS from './components/HeaderS';

/**
 * En este archivo defino toda la estructura del dashboard
 */

const { Header, Content, Footer } = Layout;
/*const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));*/
const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Navbar/>
      <Header>
        <HeaderS/>
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
          <DepartmentTable />
          
        </div>
        
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Challenge: React & Laravel ©{new Date().getFullYear()}
        Created by <a href='https://ericobreque.cl'>Eric Obreque</a> 
      </Footer>
    </Layout>
  );
};
export default App;