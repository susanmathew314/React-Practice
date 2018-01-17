<p>
An attempt to implement very simple front end routing in react without bringing in a 3rd party 
module. 
</p>
<p>It consists of a Router class with a function to update the location path, and listen to changes in window history and link clicks</p>
<p>Then there is a RouterOutlet component that renders a component based on the url path, and distributes the Router object to its children components</p>

<p>Its not the most efficent or robust solution, and it certainly still needs some work and refactoring. But I built it mostly as a learning experiment just to see if I could.</p>