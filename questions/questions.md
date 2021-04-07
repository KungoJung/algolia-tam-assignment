*Question 1*


From: marissa@startup.com
Subject:  Bad design

Hello,

Sorry to give you the kind of feedback that I know you do not want to hear, but I really hate the new dashboard design. Clearing and deleting indexes are now several clicks away. I am needing to use these features while iterating, so this is inconvenient.

Thanks,
Marissa


*Answer 1:*


Hello Marissa,

I am sorry to hear you do not like the new dashboard design, and I will relay that feedback to the appropriate people.

In the meantime, if deleting one index at a time is too slow, you can writing a script using our API to delete as many indexes as you need. Here is an [example](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-your-indices/how-to/delete-multiple-indices/?client=javascript) of how to do that.

Please let me know if that is of any help.

Thanks,
Danny


--

*Question 2*:

From: carrie@coffee.com
Subject: URGENT ISSUE WITH PRODUCTION!!!!

Since today 9:15am we have been seeing a lot of errors on our website. Multiple users have reported that they were unable to publish their feedbacks and that an alert box with "Record is too big, please contact enterprise@algolia.com".

Our website is an imdb like website where users can post reviews of coffee shops online. Along with that we enrich every record with a lot of metadata that is not for search. I am already a paying customer of your service, what else do you need to make your search work?

Please advise on how to fix this. Thanks.


*Answer 2:*


Hello Carrie,

The maximum record size we are able to store is 100kb for any individual record. This is primarily to keep our search fast and relevant. You will need to reduce the size of each record by one or two methods:

1. Simplify record structure to only include pertinent search data, i.e. data useful for searching, faceting, ranking, or display.
2. Split the records into smaller chunks and use our distinct feature (linked [here](https://www.algolia.com/doc/api-reference/api-parameters/distinct/))

For your site, the first method should do the trick, but you would have to find another method of storing your non-search-related metadata.

For more info, check out [this article](https://www.algolia.com/doc/faq/basics/is-there-a-size-limit-for-my-index-records/) on size limits for records, and [this one](https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/) on formatting your data.

Thanks,
Danny

--

*Question 3*:


From: marc@hotmail.com
Subject: Error on website

Hi, my website is not working and here's the error:

![error message](./error.png)

Can you fix it please?


*Answer 3:*


Hello Marc,

Thanks for bringing this to my attention. It looks like an issue with the package bundler (parcel). First, is your code working as one would expect when run locally -- and you're only getting this error in production?

I would be glad to take a look as soon as I am able. Are you available at [ a time ]?

Thanks,
Danny
