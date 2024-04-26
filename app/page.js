import Announcement from "@/components/Announcement";
import History from "@/components/History";
import Notification from "@/components/Notification";
import classes from './page.module.css';


export default function Home() {


  return (
    <div>
      <h1>Home</h1>
      <Announcement />
      <div className={classes.etc}>
      <History/>
      <Notification/>
      </div>
    </div>
  );
}
