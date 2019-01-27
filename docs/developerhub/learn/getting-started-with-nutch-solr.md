---
layout: page
section: learn
hideLogoInit: false
title: Getting started with Nutch & Solr
categories: [Nutch,Solr,Search,Data Science]
last_updated: January 21, 2019
---
Our learning starts with Nutch since it is the genesis of Hadoop - technical foundational stone for most of the modern day data science. Nutch is a matured and production-ready web crawler. We will start our focus on Nutch 1.X since at the time of writing this is more mature, configurable and receives more contributions than the 2.X branch.

## Crawling for the first time
We will first crawl one website, to begin with, and indexing the data to Solr. We will start simple, by starting with a binary install. We will eventually also get into source code, once we get the binary working.

### Requirements

* Unix environment, or Windows-[Cygwin](https://www.cygwin.com/){:target='_blank'} environment. Note: I use [elementaryOS](https://elementary.io/){:target='_blank'}, a Linux distro based out of [Ubuntu](https://www.ubuntu.com/){:target='_blank'}.
* JDK 1.8 / Java 8, with ${JAVA_HOME} environment variable pointing to the Java installation.
* For Source build - [Apache Ant](http://ant.apache.org/){:target='_blank'}

### 1. Installing Nutch
We will set up the binary and verify the install of the Nutch. As of writing this Nutch 1.15 was the latest version of Nutch and was used for this excercise.

#### 1.1. Setup with a binary install

1. Download the latest 1.X binary package (`apache-nutch-1.X-bin.zip`) from Apache Nutch's [official download page](http://www.apache.org/dyn/closer.cgi/nutch/){:target='_blank'}.

2. Unzip your binary Nutch package to your hard drive. In my case, the path of the unzipped binary is `/opt/nutch`.  We will address the nutch install folder as ${NUTCH_HOME}.

> Tip: On Linux and Mac, you can create a softlink such that the softlink points
> to the latest Nutch binary folder. This allows you to upgrade your binary easily.

> Tip: You can version the Nutch install in your local git repository if you want to track the changes that you are making to the configurations over the period of time.

#### 1.2. Verify your install
You can verify the install by running the following command

~~~ bash
${NUTCH_HOME}/bin/nutch
~~~

This should give a reasonable output indicating that the install was correct.

### 2. Create a workspace directory
Create a workspace directory in the following structure. We will get to the details of the structure shortly

~~~ bash
${NUTCH_HOME}/workspace/<crawlname> + /seeds
                                    + /crawldata
~~~
I highly recommend this step of creating a workspace directory, as we can have all the custom configurations and the workspace files required for Nutch crawling. Naming your crawl and specifying a directory for every crawl is a good idea, as you can keep the crawl specific configuration and data separately. In my case, I've named the crawl as `crawl-ethomasjoseph`. Rest of this exercise assumes that the workspace folder is created as specified here.

### 3. Configuring Nutch
Nutch requires two configuration changes before a website can be crawled:
1. Customize crawl properties
2. Set a list of URLs to crawl

Even when the website documentation of Nutch is not extensive, the comments in the configuration files have good details.

#### 3.1. Customize crawl properties
Nutch crawl properties can be customized in `${NUTCH_HOME}/conf/nutch-site.xml` that overwrite `${NUTCH_HOME}/conf/nutch-default.xml`.  With a fresh install, the `nutch-site.xml` has empty configurations. Most of the time, you can copy the configuration from `nutch-default.xml` into `nutch-site.xml` and change the values.

In this case, add your custom value to a property `http.agent.name`, such that the property such that the property tag looks like the below. Here you are setting the name of HTTP 'User-Agent' request header when Nutch instance crawls any website.

~~~ xml
<property>
  <name>http.agent.name</name>
  <value>Thomas_Nutch_Spider</value>
</property>
~~~
#### 3.2. Create seed URLs
Nutch would need a list of URL from where it can start a crawl. This is a plain text file that includes a list of websites, one-per-line, which nutch will look to crawl. Based on configuration, it _can_ go beyond the initial set. For examples we will create this file in the file path `${NUTCH_HOME}/workspace/crawl-ethomasjoseph/seeds/urls.txt`. It should look like the below, in our case we will be crawling this website.

~~~ text
http://ethomasjoseph.com
~~~

#### 3.3. Configure URL regular expression filter
While this is an optional step, I would highly recommend this step, as this helps you to understand the usage of this filter. Not specifying any domains to include within regex-urlfilter.txt will lead to all domains linking to your seed URLs file being crawled as well.

Edit the file `${NUTCH_HOME}/conf/regex-urlfilter.txt` and comment out (with a #) the section below

~~~ properties
# accept anything else
+.
~~~



Instead, add a regular expression matching the domain you wish to crawl. In our case, we would like to limit the crawl to the
domain and subdomain of ethomasjoseph.com. Then the file should be as below:

~~~ properties
# accept anything else
#+.

# include any URL in the domain and subdomains of ethomasjoseph.com
+^https?://([a-z0-9-]+\.)*ethomasjoseph\.com
~~~


### 4. Setup Solr
As of writing this Solr 7.6.0 is the latest Solr release available and was used for this excercise. The details on setting up SOLR can be found on the official documentation under "[Installing Solr](http://lucene.apache.org/solr/guide/7_6/installing-solr.html){:target='_blank'}". However, I will outline the important steps below.

#### 4.1. Binary Install
1. Download the Solr binary from the [offical downloads page](https://lucene.apache.org/solr/mirrors-solr-latest-redir.html){:target='_blank'}.
2. Extract the downloaded binary into a location on your hard disk say `/opt/solr`. We will address the nutch install folder as ${SOLR_HOME}. This folder should have the `bin` folder is directly inside it.

#### 4.2. Start and Verify Solr
Start the Solr on the command line:
~~~ console
${SOLR_HOME}>./bin/solr start
~~~
If the install is correct, you should see a message confirming it similar to below:
~~~ console
Started Solr server on port 8983 (pid=1146). Happy searching!
~~~
Now you can access the SOLR web interface on `http://localhost:8983/solr/`

### 5. Prepare for first Nutch Indexing
Most of the default settings of Nutch and Solr are good enough to allow Nutch to feed data to Solr for indexing. We still need to create a core in Solr, where the Nutch data will be indexed.

1. Create resources needed for a new Solr core by copying a default configuration
~~~ bash
> cd ${SOLR_HOME}/server/solr/configsets
${SOLR_HOME}/server/solr/configsets> cp -r _default ethomasjoseph
~~~

2. Create a new core in Solr
~~~ bash
> cd ${SOLR_HOME}
${SOLR_HOME}> ./bin/solr create -c ethomasjoseph -d server/solr/configsets/ethomasjoseph/conf/
~~~
If the operation was successful, the console message should indicate so with a message similar to:
~~~ text
Created new core 'ethomasjoseph'
~~~
You can also find that a new directory was created `${SOLR_HOME}/server/solr/ethomasjoseph`which represents the newly created core.

### 6. Let Nutch crawl and index to Solr
Now we will run the Nutch crawl and index the data to Solr.

1. Tell Nutch about the Solr and the core to which the indexes needs to be written. In Nutch 1.15 and above, the configuration is done in the file `${NUTCH_HOME}/conf/index-writers.xml`. Modify the 'SolrIndexWriter' configuration so that it points to the new core you just created. The section of the configuration should look similar to the below:

~~~ xml
<writer id="indexer_solr_1" class="org.apache.nutch.indexwriter.solr.SolrIndexWriter">
  <parameters>
    <param name="type" value="http"/>
    <param name="url" value="http://localhost:8983/solr/ethomasjoseph"/>
    <param name="collection" value=""/>
    <param name="weight.field" value=""/>
    <param name="commitSize" value="1000"/>
    <param name="auth" value="false"/>
    <param name="username" value="username"/>
    <param name="password" value="password"/>
  </parameters>
  <mapping>
    <copy>
      <!-- <field source="content" dest="search"/> -->
      <!-- <field source="title" dest="title,search"/> -->
    </copy>
    <rename>
      <field source="metatag.description" dest="description"/>
      <field source="metatag.keywords" dest="keywords"/>
    </rename>
    <remove>
      <field source="segment"/>
    </remove>
  </mapping>
</writer>
~~~
To know more about index writers refer to the [Nutch Wiki](https://wiki.apache.org/nutch/IndexWriters){:target='_blank'}.

2. Now we will  execute the Nutch crawl scripts, so that Nutch crawls the configured site and indexes the data to Solr. We will runt the script by specifiying the seeds at`${NUTCH_HOME}/workspace/seeds`, the crawl workspace of `${NUTCH_HOME}/crawldata` and an iteration count of 7
~~~ bash
${NUTCH_HOME}> ./bin/crawl -i -s workspace/crawl-ethomasjoseph/seeds/ workspace/crawl-ethomasjoseph/crawldata/ 7
~~~
If the operation was successful, it will take a while before the Nutch will return the control back on the console, and we can see the  message on screen that indicates what Nutch is doing.

### 7. Verification
After Nutch indexing is complete, we can go to the Solr Admin UI, and check our core for the newly indexed data. You can select the newly created code, go to the 'Query' (http://localhost:8983/solr/#/ethomasjoseph/query) and hit the 'Execute Query' button, to see the newly indexed data.

## Conclusion
This was a very simple integrated run of Nutch 1.X to crawl a website and index the data to Solr, with minimalist configuration. There is much more going behind the scenes, which is not explained here. You can certainly dig around and find more. In the upcoming learning exercise, we will find out more into Nutch and Solr.
