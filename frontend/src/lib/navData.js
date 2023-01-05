import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import SettingsIcon from '@mui/icons-material/Settings';

export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Main",
        link: "/"
    },
    {
        id: 1,
        icon: <ArticleIcon/>,
        text: "Website Articles",
        link: "Website_Articles"
    },
    {
        id: 2,
        icon: <WorkIcon/>,
        text: "Work",
        link: "Work"
    },
    {
        id: 3,
        icon: <SettingsIcon/>,
        text: "Other Articles",
        link: "Other_Articles"
    }
]