const getIconUrl = "https://s2.googleusercontent.com/s2/favicons?domain="// this Url Return the FavIcon of any website url


sites = [
    {
        "id":1,
        "name":"Google",
        "url":"https://www.google.com/search?q=",
        "icon":"<i class=\"fab fa-google\">"
    },
    {
        "id":2,
        "name":"Yahoo",
        "url":"https://search.yahoo.com/search?p=",
        "icon":"<i class=\"fab fa-yahoo\">"
    },
    {
        "id":3,
        "name":"Youtube",
        "url":"https://www.youtube.com/results?search_query=",
        "icon":"<i class=\"fab fa-youtube\">"
    },
    {
        "id":4,
        "name":"WikiPedia",
        "url":"https://en.wikipedia.org/w/index.php?search=",
        "icon":"<img width=\"30\" height=\"30\" src=\"https://www.wikipedia.org/static/favicon/wikipedia.ico\">"
    },
    {
        "id":5,
        "name":"Roblox Users",
        "url":"https://web.roblox.com/search/users?keyword=",
        "icon":"<img width=\"30\" height=\"30\" src=\"https://images.rbxcdn.com/23421382939a9f4ae8bbe60dbe2a3e7e.ico.gzip\">"
    },
    {
        "id":6,
        "name":"duck duck go",
        "url":"https://duckduckgo.com/?q=",
        "icon":"<img width=\"30\" height=\"30\" src=\"https://duckduckgo.com/favicon.ico\">"
    }
]
//------------------------------------------------------------------ 
chrome.storage.sync.get(['sites'], function(result) {
    console.log(result.sites);
    if( result.sites ) {
  //      sites = JSON.parse( result.sites )
    }else{
        chrome.storage.sync.set({sites : JSON.stringify(sites)}, function(result) { console.log(result)})
    }
  });

    if(sites.length > 0){$('.sites').empty();} // if There is no sites, Display You dont Have any sites
    
    for( site of sites){//Putting the buttons
        
        var el = `<span data-site="${site.id}" class="card"><img width="30" height="30" src="${getIconUrl+site.url}"><br><span class="button" >${site.name}</span></span>`
        $('.sites').append(el);
    }

    $('#search-field').focus(); // focusing the Search bar

    $('.card').on('click',function() {
        let id = $(this).data('site')//get the site id
        let site = sites.find(x => x.id == id ) //get the site
        let url = site.url+formate($('#search-field').val(), (site.spaceChar?site.spaceChar:null)); //Create the url to go to
        chrome.tabs.create({ url: url }); // open new tab with the new url
    });


//------------------------------------------------------------------ Settings
    $('.settings').on('click', function() {
        if($(this).hasClass('active')){
            $('#main').css('transform','translateX(0px)')
            $('#main').css('position','')
            
            $(this).removeClass('active');
            
        }else{
            $('#main').css('transform','translateX(-500px)')
            $('#main').css('position','absolute')
            
            $(this).addClass('active');
        }
        
    });
    function formate(string,SpaceChar){
        return string.replace(' ',(SpaceChar?SpaceChar:' '));
    }
        

