class Task {
    constructor(title, date, description, color, status, budget, isImportant) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.color = color;
        this.status = status;
        this.budget = parseInt(budget) || 0;

        this.important = isImportant;

        this.user = "AdrianA"
    }
}
