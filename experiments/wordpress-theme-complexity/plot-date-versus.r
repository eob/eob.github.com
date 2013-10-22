library(ggplot2)
library(xts)

makeChart <- function(input.file, value.column, output.file) {
  data <- read.csv(file=input.file, header=TRUE, sep=",")
  min <- " 00:00:01"
  data$Date = as.POSIXct(paste(data$Date, min))
  data$valueColumn = with(data, get(value.column))

  # Remove ponts more than two standard deviations outside the mean.
  data <- data[!abs(scale(data$valueColumn)) > 2,]

  # Aggregate into month buckets
  summ <- aggregate(
            list(value = data$valueColumn),
            list(month = cut(data$Date, "1 month")), 
            mean)

  # Remove ponts more than two standard deviations outside the mean.
  #summ <- summ[!abs(scale(summ$value)) > 2,]
  
  # Generate labels for the x axis so we don't get crowding
  x_breaks <- seq(as.Date("2008/7/1"), as.Date("2013/7/1"), by="6 months")
  x_labels <- as.character(x_breaks, format="%h-%y")

  # And then re-parse the dates so for our axis
  summ$month = as.Date(summ$month)
  pdf(output.file)

  # `print` is necessary when inside a function (because the default is to
  # suppress output.
  print(ggplot(data = summ, aes(x=month, y=value)) +
    theme_bw() +
    geom_point() +
    geom_smooth() +
    scale_x_date(breaks=x_breaks, labels=x_labels))
  dev.off()
}

makeChart("YearVersusBytesNoImages.csv", "BytesNoImages", "year-versus-bytes-no-images.pdf")
makeChart("YearVersusNumFiles.csv", "NumFiles", "year-versus-num-files.pdf")
