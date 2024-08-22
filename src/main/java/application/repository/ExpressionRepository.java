package application.repository;

import application.model.Expression.Expression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpressionRepository extends CrudRepository <Expression, Long> {
}
