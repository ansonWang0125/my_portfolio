import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Main",
        link: "",
        needLogin: false
    },
    {
        id: 1,
        icon: <ArticleIcon/>,
        text: "Website Articles",
        link: "Website_Articles",
        needLogin: false
    },
    {
        id: 2,
        icon: <WorkIcon/>,
        text: "Work",
        link: "Work",
        needLogin: false
    },
    {
        id: 3,
        icon: <SettingsIcon/>,
        text: "Other Articles",
        link: "Other_Articles",
        needLogin:false
    },
    {
        id: 4,
        icon: <CreateIcon/>,
        text: "Create New Article",
        link: "Create",
        needLogin:true
    }
]