const [watchData, setWatchData] = useState([]);

     useEffect(() => {
        async function fetchWatches() {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/${itemId}`,
              { method: "GET", credentials: "include" }
            );
    
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
    
            const watchData = await response.json();
            setWatchData(watchData);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
    
        fetchWatches();
      }, [itemId]);