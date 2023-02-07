import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import FolderIcon from '@mui/icons-material/Folder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Main",
        link: "",
        needLogin: false,
        root: false
    },
    {
        id: 1,
        icon: <ArticleIcon/>,
        text: "Website Articles",
        link: "Website_Articles",
        needLogin: false,
        root: false
    },
    {
        id: 2,
        icon: <WorkIcon/>,
        text: "Portfolios",
        link: "Portfolios",
        needLogin: false,
        root: false
    },
    {
        id: 3,
        icon: <SettingsIcon/>,
        text: "Technical Articles",
        link: "Technical_Articles",
        needLogin:false,
        root: false
    },
    {
        id: 4,
        icon: <CreateIcon/>,
        text: "Create New Article",
        link: "Create",
        needLogin:true,
        root: false
    },
    {
        id: 5,
        icon: <FolderIcon/>,
        text: "My Articles",
        link: "My_Articles",
        needLogin:true,
        root: false
    },
    {
        id: 6,
        icon: <ManageAccountsIcon/>,
        text: "Data Management",
        link: "Data_Management",
        needLogin:true,
        root: true
    }
]