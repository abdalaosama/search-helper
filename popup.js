const getIconUrl = "https://s2.googleusercontent.com/s2/favicons?domain="// this Url Return the FavIcon of any website url
sites = [ // default Webisites
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


chrome.storage.sync.get(['first','sites'], function(result) { // applying the default if they werent set already
    if(result.first != 'no'){
        chrome.storage.sync.set({first:'no', sites: JSON.stringify(sites) }, function(result) { console.log(result)})
    }else{
        if(result.sites.length >= 0) {
            updateStorage();
        }
        chrome.storage.sync.get(['sites'], function(result) {
                sites = JSON.parse( result.sites )
            if(sites.length > 0){
                
                
                $('#search-field').focus(); // focusing the Search bar
                render();
            
            } // if There is no sites, Display You dont Have any sites
        });
        $('.settings').hide()
    }
})

//------------------------------------------------------------------ Settings
$('.setting').on('click', function() {
        if($(this).hasClass('active')){
            $('#main').css('transform','translateX(0px)')
            $('#main').show()
            $('.settings').hide()
            $(this).removeClass('active');
            render()
        }else{
            $('#main').css('transform','translateX(-500px)')
            $('#main').hide()
            $('.settings').show()
            $(this).addClass('active');
        }
        
    });

$('#newsite').on('click',function(){
    $('#addsite').css('display','inline');
    
});
$('#removesite').on('click',function(){
    $('#remove').empty();
    for( site of sites){
        var el = `<span data-site="${site.id}" class="remcard"><img width="30" height="30" src="${getIconUrl+site.url}"><br><span class="button" >${site.name}</span></span>`
        $('#remove').append(el);
        $('#remove').show();
    }
    $('.remcard').on('click',function() { // the buttons events
        let id = $(this).data('site')//get the site id
        sites.splice( sites.findIndex(x => x.id == id ), 1);
        updateStorage();
        $('#remove').hide();
    });


});

function updateStorage(){
    chrome.storage.sync.set({first:'no', sites: JSON.stringify(sites) }, function(result) { console.log(result)})
}

$('#main').on('click',(e)=>{
     $('#addsite').css('display','none');
 });
    function formate(string,SpaceChar){

        return string.replace(' ',(SpaceChar?SpaceChar:' '));
    }
        

$('#add').on('click',function(){ // inserting new websites
    let sitename = $('#name').val();
    let siteurl = $('#url').val();
    
    var largest= 0;
    for (let i=0; i < sites.length;i++){
        if (sites[i].id > largest) {
            largest = sites[i].id;
        }
    }
    sites.push({
        "id":largest + 1,
    "name":sitename,
    "url":siteurl}
    )
    updateStorage();
    $('#addsite').hide();
});

function render(){//Drawing the buttons
    $('.sites').empty();
    for( site of sites){
        var el = `<span data-site="${site.id}" class="card"><img width="30" height="30" src="${getIconUrl+site.url}"><br><span class="button" >${site.name}</span></span>`
        $('.sites').append(el);

    }
    $('.card').on('click',function() { // the buttons events
        let id = $(this).data('site')//get the site id
        let site = sites.find(x => x.id == id ) //get the site
        let url = site.url+formate($('#search-field').val(), (site.spaceChar?site.spaceChar:null)); //Create the url to go to
        chrome.tabs.create({ url: url }); // open new tab with the new url
    });
}
