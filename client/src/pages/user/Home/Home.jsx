
import HomeContent from "../../../components/users/home/HomeContent"
import SideNav from "../../../components/sideNav/SideNav" 
import PageWrapper from "../../../components/admin/PageWrapper"
import Posts from "../../../components/users/posts/Posts"
import NavBar from "../../../components/users/navBar/NavBar"
import RightSideBar from "../../../components/users/rightSideBar/RightSideBar"
function Home() {

  return (
    <div> 
      <PageWrapper>
        <SideNav/>
        <NavBar/>
        <Posts/>
        <RightSideBar/>
        
      </PageWrapper>
         
        
    </div>
  )
} 

export default Home
